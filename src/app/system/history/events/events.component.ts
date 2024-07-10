import { Component, Input, OnInit } from '@angular/core';
import { DecimalPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DropdownDirective } from "../../../shared/directives/dropdown.directive";
import { FormatPipe } from "../../../shared/pipes/format.pipe";
import { FilterPipe } from "../../../shared/pipes/filter.pipe";
import { Category } from "../../../shared/models/category.model";
import { AppEvent } from "../../../shared/models/event.model";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    RouterLink,
    NgIf,
    DecimalPipe,
    FormatPipe,
    DropdownDirective,
    FormsModule,
    FilterPipe
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  constructor() {}

  @Input() categories: Category[] = [];
  @Input() events: AppEvent[] = [];

  searchValue: string = '';
  searchPlaceholder: string = 'Сумма';
  searchField: string = 'amount';

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category)?.name;
    });
  }

  getEventClass(e: AppEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field: string) {
    const namesMap: any = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }
}
