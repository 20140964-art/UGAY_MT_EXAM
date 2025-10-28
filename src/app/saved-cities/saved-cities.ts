import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CityService } from '../service/city.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved-cities',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './saved-cities.html',
  styleUrls: ['./saved-cities.css']
})
export class SavedCities implements OnInit {
  cities: any[] = [];

  constructor(private cityService: CityService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadCities();
      }
    });
  }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.cities = this.cityService.getCities();
    console.log('Loaded cities:', this.cities);
  }

  removeCity(name: string) {
    this.cityService.removeCity(name);
    this.loadCities();
  }
}
