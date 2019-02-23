import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';
import { EventFieldItem } from 'src/app/models/eventField';
import { EventFieldsDataSource } from './events-fields-datasource';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EventFieldsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nameAlertType', 'date', 'nameField', 'company'];

  events: EventFieldItem[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.events = this.route.snapshot.data.eventsData.events || [];
    this.dataSource = new EventFieldsDataSource(this.paginator, this.sort, this.events);
  }

  public selectEvent(event: EventFieldItem) {
    this.dataTransferService.setData(event);
    this.router.navigate(['/dashboard/event']);
  }

}
