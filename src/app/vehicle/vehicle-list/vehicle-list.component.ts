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
  constructor(private vehicleService: VehicleService) { }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });
  }

  ngOnInit() {
    this.getVehicles();
  }

}
