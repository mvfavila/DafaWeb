import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataTransferService } from '../data-transfer.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar, MatDatepickerModule } from '@angular/material';
import { EventFieldItem } from 'src/app/models/eventField';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventForm = this.fb.group({
    date: [null, Validators.required],
    solutionDate: [null],
    solved: [false],
    alertType: [null, Validators.required],
    nameField: [null, Validators.required],
    company: [null, Validators.required]
  });

  public hasUnitNumber = false;
  public showInputErrors = false;
  public hasFailed = false;
  public isBusy = false;
  public data: any;

  states = [];

  constructor(private fb: FormBuilder,
    private dataTransferService: DataTransferService,
    private router: Router,
    private api: ApiService,
    public snackBar: MatSnackBar,
    public picker: MatDatepickerModule
  ) {}

  ngOnInit() {
    // Grab client from data transfer service
    this.data = this.dataTransferService.getData();
    if (this.data) {
      // Fill form
      this.eventForm.patchValue(this.data);
      // Put client back in the data transfer service
      this.dataTransferService.setData(this.data);
    }
  }

  openSnackBar(message: string) {
    return this.snackBar.open(message, 'Close', {
      duration: 2000
    });
  }

  onSubmit() {
    // Make sure form values are valid
    if (this.eventForm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab client from data transfer service
    const event = this.dataTransferService.getData();

    // Grab values from form
    event.solved = this.eventForm.value['solved'];

    // Submit request to API
    this.api
      .updateEventStatus(event)
      .subscribe((eventFieldItem: EventFieldItem) => {
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
        this.eventForm.controls['solved'].setValue(true);
      } else {
        this.eventForm.controls['solved'].setValue(false);
      }
  }
}
