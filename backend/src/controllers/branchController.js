const prisma = require('../prisma');

const getAllBranches = async (req, res) => {
  try {
    const branches = await prisma.branch.findMany();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch branches' });
  }
};

const getBranchById = async (req, res) => {
  try {
    const branch = await prisma.branch.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!branch) return res.status(404).json({ error: 'Branch not found' });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch branch' });
  }
};

const createBranch = async (req, res) => {
  try {
    const { name, address, manager, email, statusKey, statusColor, avatar } = req.body;
    const branch = await prisma.branch.create({
      data: { name, address, manager, email, statusKey, statusColor, avatar }
    });
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create branch' });
  }
};

const updateBranch = async (req, res) => {
  try {
    const { name, address, manager, email, statusKey, statusColor, avatar } = req.body;
    const branch = await prisma.branch.update({
      where: { id: parseInt(req.params.id) },
      data: { name, address, manager, email, statusKey, statusColor, avatar }
    });
    res.json(branch);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update branch' });
  }
};

const deleteBranch = async (req, res) => {
  try {
    await prisma.branch.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete branch' });
  }
};

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch
};
