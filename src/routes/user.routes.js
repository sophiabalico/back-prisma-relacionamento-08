import express from "express";
import UserController from "../controllers/userController.js";

const usersRouter = express.Router();

// Rotas de Usuários
// GET /users - Listar todos os users
usersRouter.get("/", UserController.getAllUsers);

// POST /users - Criar um novo user
usersRouter.post("/", UserController.createUser);

export default usersRouter;
