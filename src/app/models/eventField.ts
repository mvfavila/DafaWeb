export class EventField implements EventFieldItem {
    idEvent: string = null;
    date: Date = null;
    solutionDate: Date = null;
    solved: boolean = null;
    idField: string = null;
    nameEvent: string = null;
    nameField: string = null;
    clientId: string = null;
    company: string = null;
}

export class EventFieldItem {
    idEvent: string;
    date: Date;
    solutionDate: Date;
    solved: boolean;
    idField: string;
    nameEvent: string;
    nameField: string;
    clientId: string;
    company: string;
}
