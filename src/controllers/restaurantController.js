import RestaurantModel from "../models/restaurant.model.js";

class RestaurantController {
  // GET /restaurantes
  async getAllRestaurants(req, res) {
    try {
      const restaurantes = await RestaurantModel.findAll();
      res.json(restaurantes);
    } catch (error) {
      console.error("Erro ao buscar os restaurantes:", error);
      res.status(500).json({ error: "Erro ao buscar os restaurantes" });
    }
  }

  // POST /restaurantes
  async createRestaurant(req, res) {
    try {
      // Validação básica
      const { userId, name, category, deliveryFee, logo, openingHours } = req.body;

      // Verifica se todos os campos do restaurante foram fornecidos
      if (!userId || !name || !category || !deliveryFee) {
        return res.status(400).json({
          error: "Os campos Id do usuário, nome, categoria e delivery são obrigatórios",
        });
      }

      // Criar a novo restaurante
      const newRestaurant = await RestaurantModel.create(
        userId,
        name,
        category,
        deliveryFee,
        logo,
        openingHours
      );

      if (!newRestaurant) {
        return res.status(400).json({ error: "Erro ao criar restaurante" });
      }

      res.status(201).json({
        message: "Restaurante criado com sucesso",
        newRestaurant,
      });
    } catch (error) {
      console.error("Erro ao criar restaurante:", error);
      res.status(500).json({ error: "Erro ao criar restaurante" });
    }
  }

}

export default new RestaurantController();
