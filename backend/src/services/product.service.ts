import { fetchAllProducts } from '@config/fetchData';
import {
    IProduct,
    IProductFilter,
    IProductQueryParams,
} from '../types/product.type';
import ProductModel from '@models/product.model';

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
    const { q, sort, freeShipping, condition, minPrice, maxPrice, brand } = query;

    console.log('Type of freeShipping:', typeof freeShipping, freeShipping);

    const filter: IProductFilter = {};
    if (q) {
        filter.title = { $regex: q, $options: 'i' };

        if (freeShipping !== undefined) {
            filter.freeShipping = freeShipping === 'true' || freeShipping === true ? true : false;
        }        

        if (condition) {
            filter.condition = { $regex: condition, $options: 'i' };
        }

        if(brand) {
            filter.brand = brand;
        }

        const pipeline: any[] = [
            { $match: filter },
            {
                $addFields: {
                    priceValue: { $toDouble: '$price.value' },
                },
            },
        ];

        console.log(pipeline);
        

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
