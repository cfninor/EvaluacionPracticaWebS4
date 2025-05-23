import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.baseUrl + '202212_MISW4104_Grupo1.json';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

}
