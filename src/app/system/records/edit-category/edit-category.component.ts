import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Subscription } from "rxjs";
import { CategoriesService } from "../../../shared/services/categories.service";
import { Message } from "../../../shared/models/message.model";
import { Category } from "../../../shared/models/category.model";

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  constructor(
    private categoriesService: CategoriesService
  ) {}

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit: EventEmitter<Category> = new EventEmitter<Category>();

  currentCategoryId: string | undefined;
  currentCategory: Category | undefined;
  message!: Message;
  sub!: Subscription;

  ngOnInit() {
    this.message = new Message('success', '');
    this.currentCategoryId = this.categories[0].id;
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if (capacity < 0) capacity *= -1;

    const category: Category = new Category(name, capacity, this.currentCategoryId);

    this.sub = this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория успешно отредактирована.';

        window.setTimeout(() => {
          this.message.text = '';
        }, 3000);
      });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
