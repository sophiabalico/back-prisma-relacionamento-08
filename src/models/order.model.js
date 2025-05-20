import prisma from "../../prisma/prisma.js";

class OrderModel {
  // Obter todas as ordens
  async findAll(status, totalAmount, pagina, limite) {
    if (Number(pagina) < 1) {
      pagina = 1;
    }

    if (Number(limite) < 1 || Number(limite) > 100) {
      limite = 10;
    }
    
    const skip = (Number(pagina) - 1) * Number(limite);

    const where = {}

    if(status) {
      where.status = status
    }

    if(totalAmount) {
      where.totalAmount = {
        gte: Number(totalAmount), // Maior ou igual a 8000
      }
    }

    const ordens = await prisma.order.findMany({
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

    return { totalExibidos, totalGeral, ordens};
  }

  // Criar uma nova ordem
  async create(
      status,
      totalAmount,
      notes,
      paymentMethod,
      userId,
      restaurantId,
  ) {
    const novaOrdem = await prisma.order.create({
      data: {
        status,
        totalAmount,
        notes,
        paymentMethod,
        userId: Number(userId),
        restaurantId: Number(restaurantId)
      },
    });

    return novaOrdem;
  }

}

export default new OrderModel();
