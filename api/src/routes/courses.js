import express from "express";
import { pool } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Crear curso
router.post("/", authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const result = await pool.query(
    "INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );
  res.json(result.rows[0]);
});

// Listar cursos
router.get("/", authenticateToken, async (req, res) => {
  const result = await pool.query("SELECT * FROM courses ORDER BY id");
  res.json(result.rows);
});

// Obtener curso
router.get("/:id", authenticateToken, async (req, res) => {
  const result = await pool.query("SELECT * FROM courses WHERE id=$1", [
    req.params.id,
  ]);
  res.json(result.rows[0]);
});

// Actualizar curso
router.put("/:id", authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  await pool.query("UPDATE courses SET title=$1, description=$2 WHERE id=$3", [
    title,
    description,
    req.params.id,
  ]);
  res.json({ message: "Curso actualizado" });
});

// Eliminar curso
router.delete("/:id", authenticateToken, async (req, res) => {
  await pool.query("DELETE FROM courses WHERE id=$1", [req.params.id]);
  res.json({ message: "Curso eliminado" });
});

export default router;
