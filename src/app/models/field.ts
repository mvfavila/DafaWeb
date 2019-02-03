export class Field implements FieldItem {
    id: string = null;
    name: string = null;
    description: string = null;
    email: string = null;
    address: string = null;
    city: string = null;
    state: string = null;
    postalCode: string = null;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    client: string = null;
}

export class FieldItem {
    id: string;
    name: string;
    description: string;
    email: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    client: string;
}
