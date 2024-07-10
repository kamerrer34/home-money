import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from "@angular/common";
import { Subscription, combineLatest } from "rxjs";
import { BillCardComponent } from "./bill-card/bill-card.component";
import { CurrencyCardComponent } from "./currency-card/currency-card.component";
import { BillService } from "../../shared/services/bill.service";
import { Bill } from "../../shared/models/bill.model";

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    BillCardComponent,
    CurrencyCardComponent,
    NgIf
  ],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss'
})
export class BillComponent implements OnInit, OnDestroy {
  constructor(
    private billService: BillService,
  ) {}

  subInit!: Subscription;
  subRefresh!: Subscription;

  currency: any;
  bill!: Bill;
  isLoaded: boolean = false;

  ngOnInit() {
    this.subInit = combineLatest([
      this.billService.getBill(),
      this.billService.getCurrency()
    ])
      .subscribe((data: [Bill, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
      });
  }

  onRefresh() {
    this.isLoaded = false;
    this.subRefresh = this.billService.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    })
  }

  ngOnDestroy() {
    this.subInit.unsubscribe();
    if (this.subRefresh) this.subRefresh.unsubscribe();
  }
}
