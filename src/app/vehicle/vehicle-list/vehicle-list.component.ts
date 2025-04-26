import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  standalone: false,
})
export class VehicleListComponent implements OnInit {

  vehicles : Array<Vehicle> = [];
  constructor() { }

  ngOnInit() {
    
  }

}
