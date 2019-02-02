import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { EventWarningFieldItem } from 'src/app/models/EventWarningField';

/**
 * Data source for the EventWarningsFields view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EventWarningsFieldsDataSource extends DataSource<EventWarningFieldItem> {

  data: EventWarningFieldItem[] = [];

  constructor(private paginator: MatPaginator, private sort: MatSort, private eventWarningsFields: EventWarningFieldItem[]) {
    super();
    this.data = eventWarningsFields;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EventWarningFieldItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EventWarningFieldItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EventWarningFieldItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'solutionDate': return compare(a.solutionDate, b.solutionDate, isAsc);
        case 'solved': return compare(a.solved, b.solved, isAsc);
        case 'nameEventType': return compare(a.nameEventType, b.nameEventType, isAsc);
        case 'nameField': return compare(a.nameField, b.nameField, isAsc);
        case 'company': return compare(a.company, b.company, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example NameField/Date columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
