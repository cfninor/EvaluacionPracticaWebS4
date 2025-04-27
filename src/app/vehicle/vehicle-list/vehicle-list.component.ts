import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  standalone: false,
})
export class VehicleListComponent implements OnInit {

  vehicles : Array<Vehicle> = [];
  vehiclesCount: Map<string, number> = new Map();
  constructor(private vehicleService: VehicleService) { }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
      this.getNumberOfVehicles();
    });
  }

  getNumberOfVehicles(): void {
    this.vehicles.forEach(vehicle => {
      const marca = vehicle.marca;
      this.vehiclesCount.set(marca, (this.vehiclesCount.get(marca) || 0) + 1);
    });
  }

  ngOnInit() {
    this.getVehicles();
  }

}
