import prisma from "../../prisma/prisma.js";

class RestaurantModel {
  // Obter todas os restaurantes
 async findAll(name, category, pagina, limite) {
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

    if(category) {
      where.category = {
        gte: String(category),
      }
    }

  const restaurants = await prisma.restaurant.findMany({
      skip,
      take: Number(limite),
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalExibidos = restaurants.length;
    const totalGeral = await prisma.restaurant.count({ 
      where,
     });

    return { totalExibidos, totalGeral, restaurants};
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
