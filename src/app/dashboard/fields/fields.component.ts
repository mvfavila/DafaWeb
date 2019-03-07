import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FieldItem } from 'src/app/models/field';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';
import { FieldsDataSource } from './fields-datasource';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FieldsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'lastUpdate'];

  fields: FieldItem[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService,
  ) {}

  ngOnInit() {
    this.fields = this.loadFieldsData();
    this.dataSource = new FieldsDataSource(this.paginator, this.sort, this.fields);
  }

  private loadFieldsData() {
    if (!this.route.snapshot.data.fieldsData) {
      return [];
    }
    return this.route.snapshot.data.fieldsData.fields || [];
  }

  public selectField(field: FieldItem) {
    this.dataTransferService.setData(field);
    this.router.navigate([`/dashboard/field/${field._id}`]);
  }
}
