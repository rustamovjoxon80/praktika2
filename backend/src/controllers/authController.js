const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
        role: role || 'user'
      }
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid phone number or password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET || 'super_secret_quickbite_key_2026',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, phone: true, role: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login, getMe };
