import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
interface IYear {
  year: number;
}
interface IMakes {
  make: string;
}
interface ICars {
  id: number;
  year: number;
  make: string;
  model: string;
}
@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  years: IYear[];
  makes: IMakes[];
  year = 'Auswahl';
  make = 'Auswahl';

  cars: ICars[];
  ngOnInit() {
    this.getYears();
    this.getMakes();
    this.getAllCars();
  }

  async getYears() {
    this.years = await this.httpClient.get<IYear[]>('https://vehicle-data.azurewebsites.net/api/years').toPromise();
  }
  async getMakes() {
    this.makes = await this.httpClient.get<IMakes[]>('https://vehicle-data.azurewebsites.net/api/makes').toPromise();
  }

  async refresh() {
    this.makes = await this.httpClient.get<IMakes[]>('https://vehicle-data.azurewebsites.net/api/makes').toPromise();
    this.years = await this.httpClient.get<IYear[]>('https://vehicle-data.azurewebsites.net/api/years').toPromise();
    this.changeFilter();
  }

  async getAllCars() {
    this.cars = await this.httpClient.get<ICars[]>('https://vehicle-data.azurewebsites.net/api/models').toPromise();
  }
  async changeFilter() {
    console.log(this.make);
    if (this.make === 'Auswahl') {
      if (this.year === 'Auswahl') {
        this.getAllCars();
      } else {
        this.cars = await this.httpClient.get<ICars[]>(`https://vehicle-data.azurewebsites.net/api/models?year=${this.year}`).toPromise();
      }
    } else {
      if (this.year === 'Auswahl') {
        this.cars = await this.httpClient.get<ICars[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.make}`).toPromise();
      } else {
        this.cars = await this.httpClient.get<ICars[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.make}&year=${this.year}`).toPromise();
      }

    }
  }




}
