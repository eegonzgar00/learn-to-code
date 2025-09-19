import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";

const router = express.Router();

// Registro simple de usuario
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Usuario y contraseña requeridos" });

  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, display_name, keycloak_sub) VALUES ($1, $1, $2) RETURNING id",
      [username, hashed]
    );
    res.json({ id: result.rows[0].id, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registrando usuario" });
  }
});

// Login que devuelve un token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  const user = result.rows[0];

  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  const valid = await bcrypt.compare(password, user.display_name); // ojo: display_name lo usamos para la pass hasheada temporalmente

  if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;
