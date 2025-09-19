import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/courses.js";

dotenv.config();
const app = express();
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

// Ruta pública
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
