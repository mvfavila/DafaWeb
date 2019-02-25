import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataTransferService } from '../data-transfer.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material';
import { Field, FieldItem } from 'src/app/models/field';
import { EventItem } from 'src/app/models/event';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  fieldForm = this.fb.group({
    name: [null, Validators.required],
    description: [null],
    email: [null],
    address: [null],
    city: [null],
    state: [null],
    postalCode: [null, Validators.compose([
      Validators.pattern('[0-9]{5}-[0-9]{3}')])
    ],
    active: false,
    clientId: [null]
  });

  public hasUnitNumber = false;
  public showInputErrors = false;
  public hasFailed = false;
  public isBusy = false;
  public data: any;

  states = [
    {name: 'Alagoas', abbreviation: 'AL'},
    {name: 'Bahia', abbreviation: 'BA'},
    {name: 'Ceará', abbreviation: 'CE'},
    {name: 'Maranhão', abbreviation: 'MA'},
    {name: 'Paraíba', abbreviation: 'PB'},
    {name: 'Pernambuco', abbreviation: 'PE'},
    {name: 'Piauí', abbreviation: 'PI'},
    {name: 'Rio Grande do Norte', abbreviation: 'RN'},
    {name: 'Sergipe', abbreviation: 'SE'},
  ];

  constructor(private fb: FormBuilder,
    private dataTransferService: DataTransferService,
    private router: Router,
    private api: ApiService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Grab field from data transfer service
    this.data = this.dataTransferService.getData();
    if (this.data) {
      // Fill form
      this.fieldForm.patchValue(this.data);
      // Put field back in the data transfer service
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
    if (this.fieldForm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab field from data transfer service
    let field = this.dataTransferService.getData();
    let newEvent = false;
    if (!field.id) {
      field = new Field();
      newEvent = true;
    }

    // Grab values from form
    field.name = this.fieldForm.value['name'];
    field.description = this.fieldForm.value['description'];
    field.address = this.fieldForm.value['address'];
    field.city = this.fieldForm.value['city'];
    field.state = this.fieldForm.value['state'];
    field.postalCode = this.fieldForm.value['postalCode'];
    field.email = this.fieldForm.value['email'];
    field.active = this.fieldForm.value['active'];
    field.client = this.data.client;

    // Submit request to API
    if (newEvent) {
      this.createField(field);
    } else {
      this.updateField(field);
    }
  }

  private createField(field: FieldItem) {
    this.api
      .createField(field)
      .subscribe((fieldItem: FieldItem) => {
        this.isBusy = false;
        this.hasFailed = false;

        const snackBarRef = this.openSnackBar('Field created');
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

  private updateField(field: FieldItem) {
    this.api
      .updateField(field)
      .subscribe((fieldItem: FieldItem) => {
        this.isBusy = false;
        this.hasFailed = false;

        const snackBarRef = this.openSnackBar('Field updated');
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

  public onChange(e: { checked: boolean; }) {
      if (e.checked === true) {
        this.fieldForm.controls['active'].setValue(true);
      } else {
        this.fieldForm.controls['active'].setValue(false);
      }
  }

  public addEvent() {
    // Grab field from data transfer service
    this.data = this.dataTransferService.getData();

    const newEvent = new EventItem();
    newEvent.field = this.data._id;

    // Put newEvent (with field) in the data transfer service
    this.dataTransferService.setData(newEvent);

    // redirect to event component
    this.router.navigate(['/dashboard/event']);
  }
}
