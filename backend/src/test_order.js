const prisma = require('./prisma');

async function test() {
  try {
    const branch = await prisma.branch.findUnique({ where: { id: 1 } });
    if (!branch) {
      await prisma.branch.create({
        data: {
          id: 1,
          name: "Main Branch",
          address: "Default Address",
          manager: "Default Manager",
          email: "main@quickbite.uz",
        }
      });
    }

    const order = await prisma.order.create({
      data: {
        branchId: 1,
        total: 20,
        status: 'pending',
        orderItems: {
          create: [{
            productId: 1,
            name: 'products.classic_burger',
            price: 12.50,
            quantity: 1,
            note: 'No Pickles'
          }]
        }
      },
      include: { orderItems: true }
    });
    console.log("Success", order);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
test();
