export type ProductProps = {
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