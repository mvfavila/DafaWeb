export class Client implements ClientItem {
    _id: string = null;
    name: string = null;
    email: string = null;
    fields: [];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}

export class ClientItem {
    _id: string;
    name: string;
    email: string;
    fields: [];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}
