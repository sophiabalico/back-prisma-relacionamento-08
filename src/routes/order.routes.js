import express from "express";
import OrderController from "../controllers/orderController.js";

const orderRouter = express.Router();

// Rotas de ordens
// GET /orders - Listar todas as ordens
orderRouter.get("/", OrderController.getAllOrders);

// POST /orders - Criar uma nova ordem
orderRouter.post("/", OrderController.createOrder);

export default orderRouter;
