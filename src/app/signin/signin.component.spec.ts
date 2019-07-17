import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SignInComponent } from "./signin.component";
import { By } from "@angular/platform-browser";

describe("SignInComponent", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show header", () => {
    const header = fixture.debugElement.query(By.css("h1")).nativeElement;
    expect(header.textContent).toContain("Sign in");
  });
});
