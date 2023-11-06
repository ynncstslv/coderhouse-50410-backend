import express from 'express';

import middleware from './src/middlewares/middleware.js';
import config from './src/config/config.js';
import productsRoutes from './src/routes/productsRoutes.js';
import cartsRoutes from './src/routes/cartsRoutes.js';

const app = express();
const port = config.port;

middleware(app);

app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);

app.listen(port, () => {
	console.log(`[+] server is running on port ${port} [+]`);
});
