import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '../types/product.type';

export interface IProductDocument extends IProduct, Document{}

const ProductSchema: Schema = new Schema({
    offerId: { type: 'string', required: true, unique: true },
    title: { type: 'string', required: true },
    description: { type: 'string' },
    url: { type: 'string', required: true },
    image: { type: 'string' },
    contentLanguage: { type: 'string', default: 'en' },
    targetCountry: { type: String, default: 'US' },
    availability: { type: String, default: 'in stock' },
    brand: { type: 'string' },
    condition: { type: String, default: 'new' },
    price: {
        value: { type: 'string', required: true },
        currency: { type: 'string', default: 'USD' },
    },
    isSale: { type: Boolean, default: false },
    freeShipping: { type: Boolean, default: false }
}, { _id: false });

export default mongoose.model<IProductDocument>('Product', ProductSchema);
