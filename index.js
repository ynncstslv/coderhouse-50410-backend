import express from 'express';

import middleware from './middlewares/middleware.js';
import config from './config/config.js';
import productsRoutes from './routes/productsRoutes.js';

const app = express();
const port = config.port;

middleware(app);

app.use('/products', productsRoutes);

app.listen(port, () => {
	console.log(`[+] server is running on port ${port} [+]`);
});
