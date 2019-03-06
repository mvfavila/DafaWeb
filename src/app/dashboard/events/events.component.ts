import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';
import { EventsDataSource } from './events-datasource';
import { EventItem } from 'src/app/models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EventsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['eventTypeName', 'date', 'description'];

  events: EventItem[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService) { }

  ngOnInit() {
    this.events = this.route.snapshot.data.eventsData.events || [];
    this.dataSource = new EventsDataSource(this.paginator, this.sort, this.events);
  }

  public selectEvent(event: EventItem) {
    this.dataTransferService.setData(event);
    this.router.navigate(['/dashboard/event']);
  }

}
