import { Component, OnInit } from '@angular/core';
import { NgIf } from "@angular/common";
import { AddEventComponent } from "./add-event/add-event.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";
import { CategoriesService } from "../../shared/services/categories.service";
import { Category } from "../../shared/models/category.model";

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    NgIf
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class RecordsComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService
  ) {}

  categories: Category[] = [];
  isLoaded: boolean = false;

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const idx: number = this.categories.findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }
}
