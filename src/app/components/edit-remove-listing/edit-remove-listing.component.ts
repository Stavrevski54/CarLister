import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-edit-remove-listing',
  templateUrl: './edit-remove-listing.component.html',
  styleUrls: ['./edit-remove-listing.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class EditRemoveListingComponent implements OnInit {
  listing: any = null;
  isLoading = true;
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchCarDetails(id);
      }
    });
  }

  fetchCarDetails(id: string): void {
    this.http.get<any>(`http://localhost:3000/cars/${id}`).subscribe(
      (data: any) => {
        this.listing = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching car details:', error);
        alert('Car not found!');
        this.router.navigate(['/cars']);
      }
    );
  }

  onSaveChanges(): void {
    if (this.listing) {
      this.http
        .put<any>(`http://localhost:3000/cars/${this.listing.id}`, this.listing)
        .subscribe(
          (updatedCar: any) => {
            console.log('Car updated successfully:', updatedCar);
            alert('Changes saved successfully!');
            this.router.navigate(['/cars']);
          },
          (error: any) => {
            console.error('Error updating car:', error);
            alert('Failed to save changes.');
          }
        );
    }
  }

  onReset(): void {
    if (this.listing) {
      this.fetchCarDetails(this.listing.id);
    }
  }

  onRemoveListing(): void {
    this.http
      .delete<any>(`http://localhost:3000/cars/${this.listing.id}`)
      .subscribe(
        () => {
          console.log('Car deleted successfully');
          alert('Listing removed successfully!');
          this.router.navigate(['/cars']);
        },
        (error: any) => {
          console.error('Error deleting car:', error);
          alert('Failed to remove listing.');
        }
      );
  }

  openRemoveModal(): void {
    this.showModal = true;
  }

  closeRemoveModal(): void {
    this.showModal = false;
  }
}
