import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-form',
  standalone: true,
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class CarFormComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  carForm!: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1886),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      price: ['', [Validators.required, Validators.min(1)]],
      discount: ['', [Validators.min(0), Validators.max(100)]],
      condition: ['', Validators.required],
      mileage: ['', [Validators.required, Validators.min(0)]],
      fuel: ['', Validators.required],
      transmission: ['', Validators.required],
      category: ['', Validators.required],
      horsepower: ['', [Validators.required, Validators.min(1)]],
      engine: ['', Validators.required],
      drivetrain: ['', Validators.required],
      seating: ['', [Validators.required, Validators.min(1)]],
      image: [null],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.carForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onRemoveImage(): void {
    this.imagePreview = null;
    this.carForm.patchValue({ image: null });
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.http.get<any[]>('http://localhost:3000/cars').subscribe((cars) => {
        const nextId =
          cars.length > 0
            ? (Math.max(...cars.map((car) => +car.id)) + 1).toString()
            : '1';

        const newCar = {
          id: nextId,
          ...this.carForm.value,
        };

        this.http.post('http://localhost:3000/cars', newCar).subscribe({
          next: () => {
            console.log('Car added successfully!', newCar);
            alert('Car added successfully!');
            this.carForm.reset();
            this.imagePreview = null;
          },
          error: (err) => {
            console.error('Error adding car:', err);
            alert('Failed to add car.');
          },
        });
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  onReset(): void {
    this.carForm.reset();
    this.imagePreview = null;
  }
}
