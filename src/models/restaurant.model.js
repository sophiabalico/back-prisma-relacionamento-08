import prisma from "../../prisma/prisma.js";

class RestaurantModel {
  // Obter todas os restaurantes
  async findAll() {
    const restaurantes = await prisma.restaurant.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        users: true,
      },
    });

    // console.log(restaurantes);

    return restaurantes;
  }

  // Criar um novo restaurante
  async create(userId, name, category, deliveryFee, logo, openingHours) {
    const novoRestaurante = await prisma.restaurant.create({
      data: {
        userId,
        name,
        category,
        deliveryFee,
        logo,
        openingHours,
      },
    });

    return novoRestaurante;
  }

  
}

export default new RestaurantModel();
