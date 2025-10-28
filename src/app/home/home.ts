import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Weather } from '../service/weather.service';
import { CityService } from '../service/city.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  cityName = '';
  weatherData: any;
  errorMsg = '';

  constructor(private Weather: Weather, private cityService: CityService) {}

  getWeather() {
    this.Weather.getWeather(this.cityName).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        this.errorMsg = '';
      },
      error: () => {
        this.errorMsg = 'Failed to fetch weather data.';
      }
    });
  }

  saveCity() {
    if (this.weatherData) {
      this.cityService.addCity({
        name: this.weatherData.location.name,
        temperature: this.weatherData.current.temperature,
      });
      alert('City saved!');
    }
  }
}

