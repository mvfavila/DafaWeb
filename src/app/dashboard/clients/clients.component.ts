import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.clients = this.route.snapshot.data.pageData.clients || [];
  }

}
