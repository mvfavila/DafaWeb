import { environment } from "../environments/environment";

const API_URL = environment.apiUrl;

export class ClientRoutes {
  public static default = () => API_URL + "/clients";
  public static fieldsByClient = (clientId: any) =>
    `${ClientRoutes.default()}/${clientId}/fields`;
}

export class UserRoutes {
  public static signIn = () => API_URL + "/users/login";
}

export class FieldRoutes {
  public static default = () => API_URL + "/fields";
  public static eventsFromField = (fieldId: any) =>
    `${FieldRoutes.default}/${fieldId}/events`;
}

export class EventRoutes {
  public static default = () => API_URL + "/events";
}

export class AlertTypeRoutes {
  public static default = () => API_URL + "/alertTypes";
}

export class EventWarningRoutes {
  public static default = () => API_URL + "/eventWarnings";
  public static byId = (eventWarningId: any) =>
    `${EventWarningRoutes.default}/${eventWarningId}`;
}
