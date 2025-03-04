import { Express } from 'express';
import { productRoutes } from './product.route';

const v1Route = (app: Express) => {
    const version = '/api/v1';

    app.use(version + '/products', productRoutes);
};

export default v1Route;