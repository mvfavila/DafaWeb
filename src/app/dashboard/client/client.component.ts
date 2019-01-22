import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';
import { ClientItem } from 'src/app/models/client';
import { DataTransferService } from '../data-transfer.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientForm = this.fb.group({
    company: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required], // TODO: add pattern validator
    address: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.pattern('[0-9]{5}-[0-9]{3}')])
    ],
    active: false,
  });

  public hasUnitNumber = false;
  public showInputErrors = false;
  public hasFailed = false;
  public isBusy = false;

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
  ) {}

  ngOnInit() {
    // Grab client from data transfer service
    const data = this.dataTransferService.getData();
    if (!data) {
      alert('Invalid data');
      this.router.navigate(['/dashboard']);
    } else {
      // Fill form
      this.clientForm.patchValue(data);
      // Put client back in the data transfer service
      this.dataTransferService.setData(data);
    }
  }

  onSubmit() {
    // Make sure form values are valid
    if (this.clientForm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab client from data transfer service
    const client = this.dataTransferService.getData();

    // Grab values from form
    client.company = this.clientForm.value['company'];
    client.firstName = this.clientForm.value['firstName'];
    client.lastName = this.clientForm.value['lastName'];
    client.email = this.clientForm.value['email'];
    client.address = this.clientForm.value['address'];
    client.city = this.clientForm.value['city'];
    client.state = this.clientForm.value['state'];
    client.postalCode = this.clientForm.value['postalCode'];
    client.active = this.clientForm.value['active'];

    // Submit request to API
    this.api
      .updateClient(client)
      .subscribe((clientItem: ClientItem) => {
        this.isBusy = false;
        this.hasFailed = false;
      },
      (error) => {
        this.isBusy = false;
        this.hasFailed = true;
      }
    );
  }

  onChange(e: { checked: boolean; }) {
      if (e.checked === true) {
        this.clientForm.controls['active'].setValue(true);
      } else {
        this.clientForm.controls['active'].setValue(false);
      }
  }
}
