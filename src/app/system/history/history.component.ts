import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from "@angular/common";
import { combineLatest, Subscription } from "rxjs";
import moment from 'moment';
import { ChartComponent } from "./chart/chart.component";
import { EventsComponent } from "./events/events.component";
import { FilterComponent } from "./filter/filter.component";
import { CategoriesService } from "../../shared/services/categories.service";
import { EventsService } from "../../shared/services/events.service";
import { Category } from "../../shared/models/category.model";
import { AppEvent } from "../../shared/models/event.model";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    FilterComponent,
    ChartComponent,
    EventsComponent,
    NgIf
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit, OnDestroy {
  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) {}

  isLoaded: boolean = false;
  isFilterVisible: boolean = false;
  categories: Category[] = [];
  events: AppEvent[] = [];
  filteredEvents: AppEvent[] = [];
  chartData: any = [];
  sub!: Subscription;

  ngOnInit() {
    this.sub = combineLatest([
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ])
      .subscribe((data: [Category[], AppEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];
        this.setOriginalEvents();
        this.calculateChartData();
        this.isLoaded = true;
      });
  }

  setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData() {
    this.chartData = [];
    this.categories.forEach((cat: Category) => {
      const catEvent: AppEvent[] = this.filteredEvents.filter((e: AppEvent) => e.category === cat.id && e.type === 'outcome');
      const value: number = catEvent.reduce((total: number, e: AppEvent) => {
        total += e.amount;
        return total;
      }, 0);
      this.chartData.push({ name: cat.name, value: value });
    });
  }

  toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  onFilterApply(filterData: any) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
