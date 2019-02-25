export class EventType implements EventTypeItem {
    id: string = null;
    name: string = null;
    description: string = null;
    alertTypes: string[] = [];
    createdAt: Date = null;
    updatedAt: Date = null;
    active: boolean = null;
}

export class EventTypeItem {
    id: string;
    name: string;
    description: string;
    alertTypes: string[];
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}
