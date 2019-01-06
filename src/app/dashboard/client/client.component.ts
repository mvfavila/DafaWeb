import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  clientForm = this.fb.group({
    company: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required], // TODO: add pattern validator
    address: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.pattern('[\d]{5}-[\d]{3}')])
    ],
    active: [false],
  });

  hasUnitNumber = false;
  active = true;

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

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Thanks!');
  }

  onChange(ob: MatSlideToggleChange) {

  }
}
