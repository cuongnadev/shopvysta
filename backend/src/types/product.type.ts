export interface IProduct {
    offerId: string;
    title: string;
    description: string;
    url: string;
    image: string;
    contentLanguage: string;
    targetCountry: string;
    availability: string;
    brand: string;
    price: {
        value: string;
        currency: string;
    };
    condition: string;
    isSale: Boolean,
    freeShipping: Boolean
}

export interface IProductQueryParams {
    search?: string;
    sort?: 'priceAsc' | 'priceDesc';
    freeShipping?: boolean;
    conditions?: string;
    minPrice?: string;
    maxPrice?: string;
}

export interface IProductFilter {
    title?: { $regex: string; $options: string };
    freeShipping?: boolean;
    condition?: string;
    $expr?: {
        $and?: Array<{ $gte?: [ { $toDouble: string }, number ] } | { $lte?: [ { $toDouble: string }, number ] }>;
    } | { 
        $gte?: [ { $toDouble: string }, number ]; 
        $lte?: [ { $toDouble: string }, number ]; 
    };
}

