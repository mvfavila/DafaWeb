import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ClientItem, Client } from "src/app/models/client";
import { DataTransferService } from "../data-transfer.service";
import { Router } from "@angular/router";
import { ClientApiService } from "src/app/services/client.api.service";
import { MatSnackBar } from "@angular/material";
import { Field } from "src/app/models/field";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"]
})
export class ClientComponent implements OnInit {
  private clientForm = this.fb.group({
    company: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required], // TODO: add pattern validator
    address: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([Validators.pattern("[0-9]{5}-[0-9]{3}")])
    ],
    active: false
  });

  public hasUnitNumber = false;
  public showInputErrors = false;
  public hasFailed = false;
  public isBusy = false;
  public data: any;

  private states = [
    { name: "Alagoas", abbreviation: "AL" },
    { name: "Bahia", abbreviation: "BA" },
    { name: "Ceará", abbreviation: "CE" },
    { name: "Maranhão", abbreviation: "MA" },
    { name: "Paraíba", abbreviation: "PB" },
    { name: "Pernambuco", abbreviation: "PE" },
    { name: "Piauí", abbreviation: "PI" },
    { name: "Rio Grande do Norte", abbreviation: "RN" },
    { name: "Sergipe", abbreviation: "SE" }
  ];

  public constructor(
    private fb: FormBuilder,
    private dataTransferService: DataTransferService,
    private router: Router,
    private api: ClientApiService,
    public snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    // Grab client from data transfer service
    this.data = this.dataTransferService.getData();
    if (this.data) {
      // Fill form
      this.clientForm.patchValue(this.data);
      // Put client back in the data transfer service
      this.dataTransferService.setData(this.data);
    }
  }

  public openSnackBar(message: string) {
    return this.snackBar.open(message, "Close", {
      duration: 2000
    });
  }

  public onSubmit() {
    // Make sure form values are valid
    if (this.clientForm.invalid) {
      this.showInputErrors = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab client from data transfer service
    let client = this.dataTransferService.getData();
    let newClient = false;
    if (!client) {
      client = new Client();
      newClient = true;
    }

    // Grab values from form
    client.firstName = this.clientForm.value["firstName"];
    client.lastName = this.clientForm.value["lastName"];
    client.company = this.clientForm.value["company"];
    client.address = this.clientForm.value["address"];
    client.city = this.clientForm.value["city"];
    client.state = this.clientForm.value["state"];
    client.postalCode = this.clientForm.value["postalCode"];
    client.email = this.clientForm.value["email"];
    client.active = this.clientForm.value["active"];

    // Submit request to API
    if (newClient) {
      this.createClient(client);
    } else {
      this.updateClient(client);
    }
  }

  public addField() {
    // Grab client from data transfer service
    this.data = this.dataTransferService.getData();

    const newField = new Field();
    newField.client = this.data._id;

    // Put newField (with cliendId) in the data transfer service
    this.dataTransferService.setData(newField);

    // redirect to field component
    this.router.navigate(["/dashboard/field"]);
  }

  private createClient(client: ClientItem) {
    this.api.createClient(client).subscribe(
      (clientItem: ClientItem) => {
        this.isBusy = false;
        this.hasFailed = false;

        const snackBarRef = this.openSnackBar("Client created");
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

  private updateClient(client: ClientItem) {
    this.api.updateClient(client).subscribe(
      (clientItem: ClientItem) => {
        this.isBusy = false;
        this.hasFailed = false;

        const snackBarRef = this.openSnackBar("Client updated");
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

  public onChange(e: { checked: boolean }) {
    if (e.checked === true) {
      this.clientForm.controls["active"].setValue(true);
    } else {
      this.clientForm.controls["active"].setValue(false);
    }
  }
}
