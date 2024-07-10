import { Component, Input, OnInit } from '@angular/core';
import { DecimalPipe } from "@angular/common";
import { Bill } from "../../../shared/models/bill.model";

@Component({
  selector: 'app-bill-card',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './bill-card.component.html',
  styleUrl: './bill-card.component.scss'
})
export class BillCardComponent implements OnInit {
  constructor() {}

  @Input() bill!: Bill;
  @Input() currency: any;

  dollar!: number;
  euro!: number;

  ngOnInit() {
    const { rates } = this.currency;
    this.dollar = rates['USD'] * this.bill.value;
    this.euro = rates['EUR'] * this.bill.value;
  }
}
