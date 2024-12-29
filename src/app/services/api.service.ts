import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/cars'; // Simplify the base URL to the specific endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetch all cars.
   * @returns Observable<any[]> - An observable of the list of cars.
   */
  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  /**
   * Fetch a single car by ID.
   * @param id - The ID of the car to fetch.
   * @returns Observable<any> - An observable of the car details.
   */
  getCar(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  /**
   * Add a new car.
   * @param car - The car data to add.
   * @returns Observable<any> - An observable of the created car.
   */
  addCar(car: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, car);
  }

  /**
   * Update a car by ID.
   * @param id - The ID of the car to update.
   * @param car - The updated car data.
   * @returns Observable<any> - An observable of the updated car.
   */
  updateCar(id: number, car: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, car);
  }

  /**
   * Delete a car by ID.
   * @param id - The ID of the car to delete.
   * @returns Observable<any> - An observable of the deletion response.
   */
  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
