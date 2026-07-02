require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const branchRoutes = require('./routes/branchRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QuickBite OMS API',
      version: '1.0.0',
      description: 'API Documentation for QuickBite OMS Backend',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Root Endpoint
app.get('/', (req, res) => {
  res.send('<h1>QuickBite OMS Backend is running</h1><p>Visit <a href="/api-docs">/api-docs</a> for API documentation.</p>');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running correctly.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
