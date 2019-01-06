import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() {}

  private data: any;

  setData(data: any) {
    this.data = data;
  }

  getData() {
    const temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }
}
