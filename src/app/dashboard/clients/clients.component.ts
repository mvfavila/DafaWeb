import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ClientsDataSource } from './clients-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientItem } from 'src/app/models/client';
import { DataTransferService } from '../data-transfer.service';

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

  clients: ClientItem[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService,
  ) {}

  ngOnInit() {
    this.clients = this.route.snapshot.data.pageData.clients || [];
    this.dataSource = new ClientsDataSource(this.paginator, this.sort, this.clients);
  }

  public selectClient(client: ClientItem) {
    this.dataTransferService.setData(client);
    this.router.navigate(['/dashboard/client']);
  }
}
