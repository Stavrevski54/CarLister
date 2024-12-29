import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  cars: any[] = [];
  filteredCars: any[] = [];
  paginatedCars: any[] = [];
  searchQuery: string = '';

  currentPage: number = 1;
  pageSize: number = 6;

  filter = {
    make: '',
    model: '',
    year: '',
    price: '',
    condition: '',
  };

  yearOptions: number[] = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  clearFilters(): void {
    this.filter = {
      make: '',
      model: '',
      year: '',
      price: '',
      condition: '',
    };

    this.filteredCars = [...this.cars];

    this.currentPage = 1;
    this.updatePagination();
  }

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apiService.getCars().subscribe((data) => {
      this.cars = data.map((car) => ({
        ...car,
        price: car.discount
          ? car.price - (car.price * car.discount) / 100
          : car.price,
      }));
      this.filteredCars = [...this.cars];
      this.updatePagination();

      this.route.queryParams.subscribe((params) => {
        this.searchQuery = params['search'] || '';
        this.filterCarsByQuery();
      });
    });
  }

  filterCarsByQuery(): void {
    const query = this.searchQuery.trim().toLowerCase();

    if (query) {
      this.filteredCars = this.cars.filter((car) => {
        const makeMatch = car.make.toLowerCase().includes(query);
        const modelMatch = car.model.toLowerCase().includes(query);
        const yearMatch = car.year.toString() === query;

        return makeMatch || modelMatch || yearMatch;
      });
    } else {
      this.filteredCars = [...this.cars];
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  filterCars(): void {
    const { make, model, year, price, condition } = this.filter;

    this.filteredCars = this.cars.filter((car) => {
      return (
        (!make || car.make.toLowerCase().includes(make.toLowerCase())) &&
        (!model || car.model.toLowerCase().includes(model.toLowerCase())) &&
        (!year || car.year.toString() === year) &&
        (!price || car.price <= +price) &&
        (!condition || car.condition === condition)
      );
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCars = this.filteredCars.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCars.length / this.pageSize);
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://placehold.co/350x223/cccccc/ffffff?text=Image+Not+Available';
  }
}
