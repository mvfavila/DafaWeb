export class Event implements EventItem {
    id: string = null;
    date: Date = null;
    eventType: string = null;
    field: string = null;
    createdAt: Date = null;
    updatedAt: Date = null;
    active: boolean = null;
}

export class EventItem {
    id: string;
    date: Date;
    eventType: string;
    field: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}
