import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {
  constructor(public override http: HttpClient) {
    super(http)
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.get(`users?email=${email}`)
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user)
  }
}
