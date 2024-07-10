import { Component, OnDestroy, OnInit } from '@angular/core';
import { DecimalPipe, NgClass, NgIf } from "@angular/common";
import { ActivatedRoute, Params, RouterLink } from "@angular/router";
import { mergeMap, Subscription } from "rxjs";
import { EventsService } from "../../../shared/services/events.service";
import { CategoriesService } from "../../../shared/services/categories.service";
import { AppEvent } from "../../../shared/models/event.model";
import { Category } from "../../../shared/models/category.model";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgClass,
    DecimalPipe
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService,
  ) {}

  isLoaded: boolean = false;
  event!: AppEvent;
  category!: Category;
  sub!: Subscription;

  ngOnInit() {
    this.sub = this.route.params
      .pipe(mergeMap((params: Params) => {
        return this.eventsService.getEventById(params['id']);
      }))
      .pipe(mergeMap((event: AppEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      }))
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
