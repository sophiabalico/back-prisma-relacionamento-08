import express from "express";
import RestaurantController from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

// Rotas de restaurantes
// GET /restaurantes - Listar todas os restaurantes
restaurantRouter.get("/", RestaurantController.getAllRestaurants);

// POST /restaurantes - Criar um novo restaurante
restaurantRouter.post("/", RestaurantController.createRestaurant);


export default restaurantRouter;
