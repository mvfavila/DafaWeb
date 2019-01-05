import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ClientsDataSource } from './clients-datasource';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ClientsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  clients: Client[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.clients = this.route.snapshot.data.pageData.clients || [];
    this.dataSource = new ClientsDataSource(this.paginator, this.sort, this.clients);
  }
}
