export type Coordinates  ={
    lat: number;
    lng: number;
}


export interface Venue  {
    id: string;   
    createdAt: DateTime;
    updatedAt: DateTime;
    title: string;
    published: Boolean;
    userId: string;
    images: string[]
    user: User; 
    fullAddress: string;
    streetName: string;
    locality: string;
    Area: string;
    Country: string;
    postalCode: string;
    lat: Float;
    lng: Float;
    venueCategory: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: DateTime;
    image: string;
}

export declare type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];