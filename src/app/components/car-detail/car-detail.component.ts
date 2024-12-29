import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ContactModalComponent } from '../../contact-modal/contact-modal.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactModalComponent],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent implements OnInit {
  car: any = {};
  relatedCars$?: Observable<any[]>;
  showModal = false;
  showCarousel = false;
  heroSubtitle: string = '';
  phrases: string[] = [
    'Style meets performance',
    'Redefining the drive',
    'Experience pure elegance',
    'Power and beauty combined',
    'Crafted for excellence',
  ];
  imageGallery: string[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadCarDetails(+id);
      }
    });
  }

  loadCarDetails(id: number): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.apiService.getCar(id).subscribe(
      (car) => {
        if (car) {
          this.car = car;
          this.loadRelatedCars(id);
          this.generateRandomPhrase();
        } else {
          console.error(`Car with ID ${id} not found.`);
          this.car = null;
        }
      },
      (error) => {
        console.error('Error fetching car details:', error);
        this.car = null;
      }
    );
  }

  loadRelatedCars(currentCarId: number): void {
    this.relatedCars$ = this.apiService.getCars().pipe(
      map((cars) =>
        cars
          .filter((c) => +c.id !== +currentCarId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
      )
    );
  }

  generateRandomPhrase(): void {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    this.heroSubtitle = this.phrases[randomIndex];
  }

  get discountedPrice(): number | null {
    if (this.car?.discount) {
      return this.car.price - (this.car.price * this.car.discount) / 100;
    }
    return null;
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://placehold.co/280x180/cccccc/ffffff?text=Image+Not+Available';
  }
}
