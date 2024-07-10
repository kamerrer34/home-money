import { Component, OnDestroy, OnInit } from '@angular/core';
import { DecimalPipe, NgForOf, NgIf, NgStyle } from "@angular/common";
import { combineLatest, Subscription } from "rxjs";
import { BillService } from "../../shared/services/bill.service";
import { CategoriesService } from "../../shared/services/categories.service";
import { EventsService } from "../../shared/services/events.service";
import { Category } from "../../shared/models/category.model";
import { AppEvent } from "../../shared/models/event.model";
import { Bill } from "../../shared/models/bill.model";

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [
    NgIf,
    DecimalPipe,
    NgForOf,
    NgStyle
  ],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent implements OnInit, OnDestroy {
  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) {}

  isLoaded: boolean = false;
  bill!: Bill;
  categories: Category[] = [];
  events: AppEvent[] = [];
  sub!: Subscription;

  ngOnInit() {
    this.sub = combineLatest([
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ])
      .subscribe((data: [Bill, Category[], AppEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2];
        this.isLoaded = true;
      })
  }

  getCategoryCost(cat: Category): number {
    const catEvents: AppEvent[] = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total: number, e: AppEvent) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getPercent(cat: Category): number {
    const percent: number = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent: number = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
