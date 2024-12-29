import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
  searchQuery: string = '';
  @ViewChild('highlightsSection', { static: false })
  highlightsSection!: ElementRef;

  constructor(private router: Router) {}

  onSearch(): void {
    const query = this.searchQuery.trim();
    this.router.navigate(['/cars'], { queryParams: { search: query } });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          this.startCounterAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(this.highlightsSection.nativeElement);
  }

  startCounterAnimation(): void {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target')!, 10);
      if (isNaN(target)) {
        console.error('Invalid data-target:', counter);
        return;
      }

      const updateCount = () => {
        const current = parseInt(counter.textContent!, 10) || 0;
        const increment = Math.ceil(target / 100);

        if (current < target) {
          counter.textContent = `${current + increment}`;
          setTimeout(updateCount, 30);
        } else {
          counter.textContent = `${target}`;
        }
      };
      updateCount();
    });
  }
}
