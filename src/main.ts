/**
 * Author: Stefan Stavrevski
 * Course: Internet Programming
 * Project: CarLister - Modern Car Marketplace
 * Date: 29.12.24
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';
import { CarListComponent } from './app/components/car-list/car-list.component';
import { CarDetailComponent } from './app/components/car-detail/car-detail.component';
import { CarFormComponent } from './app/components/car-form/car-form.component';
import { HomeComponent } from './app/components/home/home.component';
import { AboutComponent } from './app/components/about/about.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EditRemoveListingComponent } from './app/components/edit-remove-listing/edit-remove-listing.component';
import { EditListingsComponent } from './app/components/edit-listings/edit-listings.component';

const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'cars/:id', component: CarDetailComponent },
  { path: 'add-car', component: CarFormComponent },
  { path: 'edit-car', component: EditListingsComponent },
  { path: 'edit-car/:id', component: EditRemoveListingComponent },
  { path: 'about', component: AboutComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
