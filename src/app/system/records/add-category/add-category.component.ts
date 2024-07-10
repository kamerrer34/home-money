import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { Subscription } from "rxjs";
import { CategoriesService } from "../../../shared/services/categories.service";
import { Category } from "../../../shared/models/category.model";

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  constructor(
    private categoriesService: CategoriesService
  ) {}

  sub!: Subscription;

  @Output() onCategoryAdd = new EventEmitter<Category>();

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity);

    this.sub = this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({ capacity: 1 });
        this.onCategoryAdd.emit(category);
      });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
