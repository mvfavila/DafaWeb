import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DataTransferService } from "../data-transfer.service";
import { Router } from "@angular/router";
import { EventApiService } from "../../services/event.api.service";
import { EventTypeApiService } from "../../services/eventtype.api.service";
import { MatSnackBar, MatDatepickerModule } from "@angular/material";
import { EventItem } from "src/app/models/event";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  private eventForm = this.fb.group({
    date: [null, Validators.required],
    eventType: [null, Validators.required],
    field: [null, Validators.required]
  });

  public hasUnitNumber = false;
  public showInputErrors = false;
  public hasFailed = false;
  public isBusy = false;
  public data: any;

  protected eventTypes = [];

  public constructor(
    private fb: FormBuilder,
    private dataTransferService: DataTransferService,
    private router: Router,
    private apiEvent: EventApiService,
    private apiEventType: EventTypeApiService,
    public snackBar: MatSnackBar,
    public picker: MatDatepickerModule
  ) {
    this.loadEventTypes();
  }

  public ngOnInit() {
    // Grab client from data transfer service
    this.data = this.dataTransferService.getData();
    if (this.data) {
      // Fill form
      this.eventForm.patchValue(this.data);
      // Put client back in the data transfer service
      this.dataTransferService.setData(this.data);
    }
  }

  private async loadEventTypes() {
    await this.apiEventType.getEventTypes().subscribe(
      result => {
        this.eventTypes = result;
      },
      error => {
        this.isBusy = false;
        this.hasFailed = true;
        this.openSnackBar("Fail");
      }
    );
  }

  public openSnackBar(message: string) {
    return this.snackBar.open(message, "Close", {
      duration: 2000
    });
  }

  public onSubmit() {
    // Make sure form values are valid
    if (this.eventForm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab event from data transfer service
    const event = this.dataTransferService.getData();

    // Grab values from form
    event.date = this.eventForm.value["date"];
    event.eventType = this.eventForm.value["eventType"];

    // Submit request to API
    this.apiEvent.createEvent(event).subscribe(
      (eventItem: EventItem) => {
        this.isBusy = false;
        this.hasFailed = false;

        const snackBarRef = this.openSnackBar("Success");
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(["/dashboard"]);
        });
      },
      error => {
        this.isBusy = false;
        this.hasFailed = true;
        this.openSnackBar("Fail");
      }
    );
  }
}
