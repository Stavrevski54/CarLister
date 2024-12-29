import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  activeFaq: number | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.8,
      }
    );

    const timelineItems =
      this.el.nativeElement.querySelectorAll('.timeline-item');
    timelineItems.forEach((item: HTMLElement) => observer.observe(item));
  }

  faqs = [
    {
      question: 'What is CarLister?',
      answer:
        'CarLister is your go-to platform for listing and discovering vehicles seamlessly.',
    },
    {
      question: 'How do I list my car?',
      answer:
        'Create an account, fill out the listing form, and upload your car details.',
    },
    {
      question: 'Is it free to list a car?',
      answer: 'Yes, listing a car on our platform is completely free.',
    },
  ];

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  isWordLimitExceeded: boolean = false;
  wordCount: number = 0;

  checkWordLimit(): void {
    this.wordCount = this.contactForm.message
      ? this.contactForm.message.trim().split(/\s+/).length
      : 0;

    this.isWordLimitExceeded = this.wordCount > 500;
  }

  submitForm(event: Event): void {
    event.preventDefault();

    if (!this.isWordLimitExceeded) {
      console.log('Form submitted successfully', this.contactForm);
      alert('Your message has been sent. Thank you!');
      this.resetForm();
    }
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      message: '',
    };
    this.isWordLimitExceeded = false;
    this.wordCount = 0;
  }
}
