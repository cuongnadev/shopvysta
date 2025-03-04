import { IProduct } from '../types/product.type';

import { contentApi, merchantId } from '@config/googleAuth';
import { API_LIMIT } from '../constant/constant';

export const fetchAllProducts = async ():Promise<IProduct[]>  => {
    let allProducts: IProduct[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
        const response = await contentApi.products.list({
            merchantId,
            maxResults: API_LIMIT,
            pageToken: nextPageToken
        });

        if(response.data.resources) {
            allProducts = [...allProducts, ...response.data.resources.map((product: IProduct) => ({
                offerId: product.offerId,
                title: product.title,
                description: product.description,
                url: product.url,
                image: product.image,
                contentLanguage: product.contentLanguage,
                targetCountry: product.targetCountry,
                availability: product.availability,
                brand: product.brand,
                price: product.price,
                condition: product.condition,
                isSale: product.isSale,
                freeShipping: product.freeShipping,
            }))];
        }

        nextPageToken = response.data.nextPageToken || null;

    } while (nextPageToken);

    return allProducts;
}