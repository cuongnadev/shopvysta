import { contentApi, merchantId } from '@config/googleAuth';
import { fetchAllProducts } from '@config/fetchData';
import {
    IProduct,
    IProductFilter,
    IProductQueryParams,
} from '../types/product.type';
import ProductModel from '@models/product.model';
import { SortOrder } from 'mongoose';

export const syncProducts = async (): Promise<void> => {
    try {
        const products = await fetchAllProducts();

        const bulkOps = products.map((product) => ({
            updateOne: {
                filter: { offerId: product.offerId },
                update: { $set: product },
                upsert: true,
            },
        }));

        // Perform bulk update if there are operations
        if (bulkOps.length > 0) {
            await ProductModel.bulkWrite(bulkOps, { ordered: false });
        }

        const merchantIds = new Set(products.map((p) => p.offerId));
        await ProductModel.deleteMany({
            offerId: { $nin: Array.from(merchantIds) },
        });

        console.log(
            `Sync products successfully with ${products.length} products`,
        );
    } catch (error) {
        console.log('Error sync products from Google Merchant');
        throw new Error(error.message);
    }
};

export const filteredProducts = async (query: IProductQueryParams) => {
    const { q, sort, freeShipping, conditions, minPrice, maxPrice } = query;

    const filter: IProductFilter = {};
    if (q) {
        filter.title = { $regex: q, $options: 'i' };

        if (freeShipping) {
            filter.freeShipping = freeShipping;
        }

        if (conditions) {
            filter.condition = conditions;
        }

        const pipeline: any[] = [
            { $match: filter },
            {
                $addFields: {
                    priceValue: { $toDouble: '$price.value' },
                },
            },
        ];

        if (minPrice || maxPrice) {
            const priceFilter: any = {};
            if (minPrice) priceFilter.$gte = Number(minPrice);
            if (maxPrice) priceFilter.$lte = Number(maxPrice);

            pipeline.push({ $match: { priceValue: priceFilter } });
        }

        if (sort === 'priceAsc') {
            pipeline.push({ $sort: { priceValue: 1 } });
        } else if (sort === 'priceDesc') {
            pipeline.push({ $sort: { priceValue: -1 } });
        }

        return await ProductModel.aggregate(pipeline);
    }
};

export function addProduct(product: IProduct) {
    return ProductModel.insertMany(product);
}
