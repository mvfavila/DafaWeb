export class Client implements ClientItem {
    _id: string = null;
    firstName: string = null;
    lastName: string = null;
    company: string = null;
    address: string = null;
    city: string = null;
    state: string = null;
    postalCode: string = null;
    email: string = null;
    fields: [];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export class ClientItem {
    _id: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    email: string;
    fields: [];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}
