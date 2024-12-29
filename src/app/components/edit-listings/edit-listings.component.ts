import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-listings',
  templateUrl: './edit-listings.component.html',
  styleUrls: ['./edit-listings.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class EditListingsComponent implements OnInit {
  listings: any[] = [];
  totalListings: number = 0;
  liveListings: number = 0;
  draftListings: number = 0;
  isLoading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchListings();
  }

  fetchListings(): void {
    this.http.get<any[]>('http://localhost:3000/cars').subscribe(
      (data: any[]) => {
        this.listings = data;
        this.isLoading = false;

        this.totalListings = data.length;
        this.liveListings = data.filter((car) => car.status === 'live').length;
        this.draftListings = data.filter(
          (car) => car.status === 'draft'
        ).length;
      },
      (error: any) => {
        console.error('Error fetching car listings:', error);
        alert('Failed to fetch listings.');
      }
    );
  }

  editListing(id: number): void {
    this.router.navigate([`/edit-car/${id}`]);
  }

  deleteListing(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this listing?');
    if (!confirmed) {
      return;
    }

    this.http.delete(`http://localhost:3000/cars/${id}`).subscribe(
      () => {
        console.log(`Listing ${id} deleted successfully.`);
        this.listings = this.listings.filter((car) => car.id !== id);
        this.updateStatistics();
      },
      (error) => {
        console.error(`Error deleting listing ${id}:`, error);
        alert('Failed to delete the listing. Please try again.');
      }
    );
  }

  updateStatistics(): void {
    this.totalListings = this.listings.length;
    this.liveListings = this.listings.filter(
      (car) => car.status === 'live'
    ).length;
    this.draftListings = this.listings.filter(
      (car) => car.status === 'draft'
    ).length;
  }
}
