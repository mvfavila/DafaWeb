export class EventWarning implements EventWarningItem {
    id: string = null;
    solutionDate: Date = null;
    solved: boolean = null;
    createdAt: Date = null;
    updatedAt: Date = null;
    active: boolean = null;
    event: string = null;
}

export class EventWarningItem {
    id: string;
    solutionDate: Date;
    solved: boolean;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    event: string;
}
