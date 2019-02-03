import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataTransferService } from '../data-transfer.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material';
import { EventWarningFieldItem } from 'src/app/models/eventWarningField';

@Component({
  selector: 'app-event-warning',
  templateUrl: './event-warning.component.html',
  styleUrls: ['./event-warning.component.scss']
})
export class EventWarningComponent implements OnInit {
  eventWarningForm = this.fb.group({
    date: [null, Validators.required],
    solutionDate: [null],
    solved: [false],
    nameAlertType: [null, Validators.required],
    nameField: [null, Validators.required],
    company: [null, Validators.required]
  });

  public hasUnitNumber = false;
  public showInputErrors = false;
  public hasFailed = false;
  public isBusy = false;

  states = [];

  constructor(private fb: FormBuilder,
    private dataTransferService: DataTransferService,
    private router: Router,
    private api: ApiService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Grab client from data transfer service
    const data = this.dataTransferService.getData();
    if (data) {
      // Fill form
      this.eventWarningForm.patchValue(data);
      // Put client back in the data transfer service
      this.dataTransferService.setData(data);
    }
  }

  openSnackBar(message: string) {
    return this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }

  onSubmit() {
    // Make sure form values are valid
    if (this.eventWarningForm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab client from data transfer service
    const eventWarning = this.dataTransferService.getData();

    // Grab values from form
    eventWarning.solved = this.eventWarningForm.value['solved'];

    // Submit request to API
    this.api
      .updateEventWarningStatus(eventWarning)
      .subscribe((eventWarningFieldItem: EventWarningFieldItem) => {
        this.isBusy = false;
        this.hasFailed = false;

        const snackBarRef = this.openSnackBar('Success');
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      (error) => {
        this.isBusy = false;
        this.hasFailed = true;
        this.openSnackBar('Fail');
      }
    );
  }

  onChange(e: { checked: boolean; }) {
      if (e.checked === true) {
        this.eventWarningForm.controls['solved'].setValue(true);
      } else {
        this.eventWarningForm.controls['solved'].setValue(false);
      }
  }
}
