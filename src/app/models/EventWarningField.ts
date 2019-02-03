export class EventWarningField implements EventWarningFieldItem {
    idEventWarning: string = null;
    date: Date = null;
    solutionDate: Date = null;
    solved: boolean = null;
    idField: string = null;
    nameEvent: string = null;
    nameField: string = null;
    clientId: string = null;
    company: string = null;
}

export class EventWarningFieldItem {
    idEventWarning: string;
    date: Date;
    solutionDate: Date;
    solved: boolean;
    idField: string;
    nameEvent: string;
    nameField: string;
    clientId: string;
    company: string;
}
