import express from "express";
import { pool } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", authenticateToken, async (req, res) => {
  const result = await pool.query("SELECT id, username, display_name FROM users");
  res.json(result.rows);
});

// Obtener un usuario
router.get("/:id", authenticateToken, async (req, res) => {
  const result = await pool.query(
    "SELECT id, username, display_name FROM users WHERE id=$1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

// Actualizar un usuario
router.put("/:id", authenticateToken, async (req, res) => {
  const { display_name } = req.body;
  await pool.query("UPDATE users SET display_name=$1 WHERE id=$2", [
    display_name,
    req.params.id,
  ]);
  res.json({ message: "Usuario actualizado" });
});

// Eliminar un usuario
router.delete("/:id", authenticateToken, async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
  res.json({ message: "Usuario eliminado" });
});

export default router;
