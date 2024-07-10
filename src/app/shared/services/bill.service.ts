import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Bill } from "../models/bill.model";

@Injectable({
  providedIn: 'root'
})
export class BillService extends ApiService {
  constructor(public override http: HttpClient) {
    super(http)
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  getCurrency(): Observable<any> {
    return this.get('currency');
  }
}
