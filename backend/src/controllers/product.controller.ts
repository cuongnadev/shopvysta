import { addProduct, filteredProducts, syncProducts } from '@services/product.service';
import { Request, Response } from 'express';
import { IProduct } from '../types/product.type';

export const syncProductsController = async (req: Request, res: Response) => {
    try {
        await syncProducts();

        res.status(200).json({ message: 'Sync Done!' });
    } catch (error) {
        res.status(500).json({ error: 'Sync Fail!' });
    };
};

export const filteredProductsController = async (req: Request, res: Response) => {
    const { q } = req.query;
    
    if (!q) {
        res.status(400).json({ message: "Invalid or missing query parameters. Please provide at least one valid query parameter." });
        return;
    };

    try {
        const products = await filteredProducts(req.query);
        console.log(products.length);
        
        res.status(200).json({ success: true, data: products });
    } catch(error) {
        res.status(500).json({ error: 'Filtered Products Failed!' });
    };
};

export const addProductController = async (req: Request, res: Response) => {
    try {
        const productData: IProduct = req.body;

        const newProduct = await addProduct(productData);

        res.status(200).json({ success: true, product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Add Product Failed!' });
    }
}
