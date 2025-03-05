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
    isSale: boolean,
    freeShipping: boolean
}

export interface IProductQueryParams {
    q?: string;
    sort?: 'priceAsc' | 'priceDesc';
    freeShipping?: true | false | 'true' | 'false';
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string
}

export interface IProductFilter {
    title?: { $regex: string; $options: string };
    freeShipping?: true | false;
    condition?: { $regex: string; $options: string };
    $expr?: {
        $and?: Array<{ $gte?: [ { $toDouble: string }, number ] } | { $lte?: [ { $toDouble: string }, number ] }>;
    } | { 
        $gte?: [ { $toDouble: string }, number ]; 
        $lte?: [ { $toDouble: string }, number ]; 
    };
    brand?: string;
}

