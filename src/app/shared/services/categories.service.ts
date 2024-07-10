import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ApiService {
  constructor(public override http: HttpClient) {
    super(http)
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.get(`categories/${id}`);
  }
}
