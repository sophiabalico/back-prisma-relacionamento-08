import UserModel from "../models/user.model.js";

class UserController {
  // GET /api/users
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }


  // POST /api/users
  async createUser(req, res) {
    try {
      // Validação básica
      const {
        email,
        password,
        name,
        userType,
        profileImage,
        bio,
      } = req.body;

      // Verifica se todos os campos do user foram fornecidos
      if (
        !email ||
        !password ||
        !name ||
        !userType
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo usuário
      const newUser = await UserModel.create(
        email,
        password,
        name,
        userType,
        profileImage,
        bio
      );

      if (!newUser) {
        return res.status(400).json({ error: "Erro ao criar usuário" });
      }

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

}
export default new UserController();
