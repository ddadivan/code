export interface Geo {
    lat: string;
    lng: string;
}

export interface Address {
    city: string;
    geo: Geo;
    street: string;
    suite: string;
    zipcode: string;
}

export interface Company {
    bs: string;
    catchPhrase: string;
    name: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface UserApi {
    id: number;
    name: string;
    age: number;
    email: string;
    phone: string;
    address: string;
    city: string;
    role: string;
}
