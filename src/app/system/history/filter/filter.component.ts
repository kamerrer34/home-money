import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Category } from "../../../shared/models/category.model";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  constructor() {}

  @Input() categories: Category[] = [];
  @Output() onFilterCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFilterApply: EventEmitter<any> = new EventEmitter<any>();

  selectedPeriod: string = 'd';

  selectedTypes: any = [];
  selectedCategories: any = [];

  timePeriods = [
    { type: 'd', label: 'День' },
    { type: 'w', label: 'Неделя' },
    { type: 'M', label: 'Месяц' }
  ];

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];

  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.onFilterCancel.emit();
  }

  handleChangeType(el: any) {
    if (el.checked) {
      this.selectedTypes.indexOf(el.value) === -1 ? this.selectedTypes.push(el.value) : null;
    } else {
      this.selectedTypes = this.selectedTypes.filter((i: any) => i !== el.value);
    }
  }

  handleChangeCategory(el: any) {
    if (el.checked) {
      this.selectedCategories.indexOf(el.value) === -1 ? this.selectedCategories.push(el.value) : null;
    } else {
      this.selectedCategories = this.selectedCategories.filter((i: any) => i !== el.value);
    }
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  ngOnInit() {
  }
}
