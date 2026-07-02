const prisma = require('../prisma');

const createOrder = async (req, res) => {
  try {
    const { branchId, total, items, status } = req.body;

    // Default branchId to 1 if not provided since we don't have multi-branch fully wired in frontend NewOrder
    const actualBranchId = branchId || 1;

    // Check if the branch exists, if not just skip or create a dummy order
    // But since it's a practice app, we will assume branch 1 exists or create the order directly.
    // Actually, prisma will throw foreign key error if branchId 1 doesn't exist.
    // Let's create branch 1 if it doesn't exist
    const branch = await prisma.branch.findUnique({ where: { id: actualBranchId } });
    if (!branch) {
      await prisma.branch.create({
        data: {
          id: actualBranchId,
          name: "Main Branch",
          address: "Default Address",
          manager: "Default Manager",
          email: "main@quickbite.uz",
        }
      });
    }

    const order = await prisma.order.create({
      data: {
        branchId: actualBranchId,
        total: total || 0,
        status: status || 'pending',
        orderItems: {
          create: items.map(item => ({
            productId: item.id || null,
            name: item.nameKey || item.name || 'Unknown Item',
            price: item.price || 0,
            quantity: item.qty || item.quantity || 1,
            note: item.note || ''
          }))
        }
      },
      include: {
        orderItems: true
      }
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message || 'Failed to create order' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {
  createOrder,
  getOrders
};
