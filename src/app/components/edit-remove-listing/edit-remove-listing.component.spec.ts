import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRemoveListingComponent } from './edit-remove-listing.component';

describe('EditRemoveListingComponent', () => {
  let component: EditRemoveListingComponent;
  let fixture: ComponentFixture<EditRemoveListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRemoveListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRemoveListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
