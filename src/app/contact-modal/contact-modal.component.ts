import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ContactModalComponent {
  @Output() close = new EventEmitter<void>();

  email: string = 'seller@example.com';
  phoneNumber: string = '+1234567890';
  showHighlights: boolean = false;

  closeModal() {
    this.close.emit();
  }

  emailSeller() {
    window.location.href = `mailto:${this.email}`;
  }

  callSeller() {
    window.location.href = `tel:${this.phoneNumber}`;
  }
}
