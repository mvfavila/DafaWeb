import { TestBed } from "@angular/core/testing";

import { ClientsCompResolver } from "./clients-comp.service";

describe("ClientsCompService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ClientsCompResolver = TestBed.get(ClientsCompResolver);
    expect(service).toBeTruthy();
  });
});
