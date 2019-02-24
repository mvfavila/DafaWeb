export class AlertType implements AlertTypeItem {
    id: string = null;
    name: string = null;
    numberOfDaysToWarning: number = null;
    createdAt: Date = null;
    updatedAt: Date = null;
    active: boolean = null;
}

export class AlertTypeItem {
    id: string;
    name: string;
    numberOfDaysToWarning: number;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
}
