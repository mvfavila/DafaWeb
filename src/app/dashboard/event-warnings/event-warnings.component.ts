import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';
import { EventWarningFieldItem } from 'src/app/models/eventWarningField';
import { EventWarningsFieldsDataSource } from './event-warnings-fields-datasource';

@Component({
  selector: 'app-event-warnings',
  templateUrl: './event-warnings.component.html',
  styleUrls: ['./event-warnings.component.scss']
})
export class EventWarningsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EventWarningsFieldsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nameEventType', 'date', 'nameField', 'company'];

  eventWarnings: EventWarningFieldItem[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.eventWarnings = this.route.snapshot.data.pageData.eventWarnings || [];
    this.dataSource = new EventWarningsFieldsDataSource(this.paginator, this.sort, this.eventWarnings);
  }

  public selectEventWarning(eventWarning: EventWarningFieldItem) {
    this.dataTransferService.setData(eventWarning);
    this.router.navigate(['/dashboard/eventWarning']);
  }

}
