import express from "express";

// Importar todas as rotas
import authRouter from "./auth.routes.js";
import usersRouter from "./user.routes.js";
import restaurantRouter from "./restaurant.routes.js";
import orderRouter from "./order.routes.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/restaurants", restaurantRouter);
router.use("/orders", orderRouter);


// Rotas protegidas
router.use(authMiddleware);

export default router;
