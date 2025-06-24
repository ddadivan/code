export interface IAddress {
    city: string;
    street: string;
    zipCode: string;
}

export  interface IEmployee {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    position: string;
    departament: string;
    employWorkDate: string;
    relatedUsers?: IEmployee[];
    address: IAddress;
    profilePicture: string;
    isChecked: boolean;
}
