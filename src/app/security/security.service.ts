/**
 * Title: security.service.ts
 * Author: Professor Krasso amd Brett Grashorn
 * Date: 8/17/23
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  // returns the page for each employee with a correct user ID
  findEmployeeById(empId: number) {
    return this.http.get('api/employees/' + empId)
  }
}
