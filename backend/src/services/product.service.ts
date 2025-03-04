import { contentApi, merchantId } from '@config/googleAuth';
import { fetchAllProducts } from '@config/fetchData';
import { IProduct, IProductFilter, IProductQueryParams } from '../types/product.type';
import ProductModel from '@models/product.model';
import { SortOrder } from 'mongoose';

export const syncProducts = async ():Promise<void> => {
    try {
        const products = await fetchAllProducts();

        const bulkOps = products.map(product => ({
            updateOne: {
                filter: { offerId: product.offerId },
                update: { $set: product },
                upsert: true,
            }
        }));

        // Perform bulk update if there are operations
        if (bulkOps.length > 0) {
            await ProductModel.bulkWrite(bulkOps, { ordered: false });
        };

        const merchantIds = new Set(products.map(p => p.offerId));
        await ProductModel.deleteMany({ offerId: { $nin: Array.from(merchantIds) } });

        console.log(`Sync products successfully with ${products.length} products`);
    } catch (error) {
        console.log("Error sync products from Google Merchant");
        throw new Error(error.message);
    }
};

export const filteredProducts = async (query: IProductQueryParams) => {
    const { q, sort, freeShipping, conditions, minPrice, maxPrice } = query;

    const filter: IProductFilter = {};
    if(q) {
        filter.title = { $regex: q, $options: 'i' }

        if(freeShipping) {
            filter.freeShipping = freeShipping;
        };
    
        if(conditions) {
            filter.condition = conditions;
        };
    
        if (minPrice || maxPrice) {
            filter.$expr = { $and: [] };
    
            if (minPrice) {
                filter.$expr.$and?.push({
                    $gte: [{ $toDouble: "$price.value" }, Number(minPrice)]
                });
            }
    
            if (maxPrice) {
                filter.$expr.$and?.push({
                    $lte: [{ $toDouble: "$price.value" }, Number(maxPrice)]
                });
            }
    
            if (filter.$expr.$and?.length === 1) {
                filter.$expr = filter.$expr.$and[0];
            }
        }
    
        const sortQuery: Record<string, SortOrder> = 
            (sort === 'priceAsc') ? { 'price.value': 1 } : 
            (sort === 'priceDesc') ? { 'price.value': -1 } : {};

        return await ProductModel.find(filter).sort(sortQuery);
    };
};

export function addProduct(product: IProduct) {
    return ProductModel.insertMany(product);
}
