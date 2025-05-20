import prisma from "../../prisma/prisma.js";

class UserModel {
  // Obter todos os usuários
  async findAll(name, userType, pagina, limite) {
    if (Number(pagina) < 1) {
      pagina = 1;
    }

    if (Number(limite) < 1 || Number(limite) > 100) {
      limite = 10;
    }
    
    const skip = (Number(pagina) - 1) * Number(limite);

    const where = {}

    if(name) {
      where.name = name
    }

    if(userType) {
      where.userType = {
        gte: String(userType),
      }
    }

  const users = await prisma.user.findMany({
      skip,
      take: Number(limite),
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalExibidos = ordens.length;
    const totalGeral = await prisma.order.count({ 
      where,
     });

    return { totalExibidos, totalGeral, users};
  }

  // Criar um novo usuário
  async create(data) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}

export default new UserModel();
