import { Component, Input, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { FormatPipe } from "../../../shared/pipes/format.pipe";

@Component({
  selector: 'app-currency-card',
  standalone: true,
  imports: [
    NgForOf,
    FormatPipe
  ],
  templateUrl: './currency-card.component.html',
  styleUrl: './currency-card.component.scss'
})
export class CurrencyCardComponent implements OnInit {
  constructor() {}

  @Input() currency: any;

  currencies: string[] = ['USD', 'EUR'];

  ngOnInit() {
  }
}
