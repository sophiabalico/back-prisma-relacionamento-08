import OrderModel from "../models/order.model.js";

class OrderController {
  // GET /ordens
  async getAllOrders(req, res) {
    const status = req.query.status;
    const totalAmount = req.query.totalAmount;
    const pagina = req.query.pagina || 1; 
    const limite = req.query.limite || 10;

    try {
      const orders = await OrderModel.findAll(status, totalAmount, pagina, limite);
      res.json(orders);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
      res.status(500).json({ error: "Erro ao buscar as cartas" });
    }
  }


  // POST /ordens
  async createOrder(req, res) {
    try {
      // Captura dos dados do corpo da requisição (frontend)
      const {
        status,
        totalAmount,
        notes,
        paymentMethod,
        userId,
        restaurantId,
      } = req.body;

      // Verifica se todos os campos da carta foram fornecidos
      if (
        !status ||
        !totalAmount||
        !userId ||
        !restaurantId 
      ) {
        return res.status(400).json({
          error:
            "Os campos status, valor total, id do usuário e id do restaurante são obrigatórios",
        });
      }

      // Criar a nova ordem
      const newOrder = await OrderModel.create(
        status,
        totalAmount,
        notes,
        paymentMethod,
        userId,
        restaurantId
      );

      if (!newOrder) {
        return res.status(400).json({ error: "Erro ao criar ordem" });
      }

      res.status(201).json({
        message: "ordem criada com sucesso",
        newOrder,
      });
    } catch (error) {
      console.error("Erro ao criar ordem:", error);
      res.status(500).json({ error: "Erro ao criar ordem" });
    }
  }

}

export default new OrderController();
