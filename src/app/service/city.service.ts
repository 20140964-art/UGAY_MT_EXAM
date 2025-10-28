import { Injectable } from '@angular/core';

export interface SavedCity {
  name: string;
  temperature: number;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cities: SavedCity[] = [];

  constructor() {
    this.loadFromStorage();
  }

  getCities(): SavedCity[] {
    return [...this.cities]; 
  }

  addCity(city: SavedCity): void {
    const exists = this.cities.some(
      c => c.name.trim().toLowerCase() === city.name.trim().toLowerCase()
    );

    if (!exists) {
      this.cities.push(city);
      this.saveToStorage();
    } else {
      console.warn(`City "${city.name}" is already saved.`);
    }
  }

  removeCity(name: string): void {
    const beforeCount = this.cities.length;
    this.cities = this.cities.filter(
      c => c.name.trim().toLowerCase() !== name.trim().toLowerCase()
    );

    if (this.cities.length !== beforeCount) {
      this.saveToStorage();
    } else {
      console.warn(`City "${name}" not found.`);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('savedCities', JSON.stringify(this.cities));
    } catch (error) {
      console.error('Failed to save cities to localStorage:', error);
    }
  }
  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('savedCities');
      if (data) {
        this.cities = JSON.parse(data);
      }
    } catch (error) {
      console.error('Failed to load cities from localStorage:', error);
      this.cities = [];
    }
  }
}
