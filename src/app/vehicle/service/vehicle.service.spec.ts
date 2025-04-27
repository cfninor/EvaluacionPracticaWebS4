/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleService } from './vehicle.service';
import { environment } from '../../../environments/environment.development';
import { faker } from '@faker-js/faker';

describe('Service: Vehicle', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;
  const mockVehicles = [
    { 
      id: faker.number.int().toString(),
      marca: faker.lorem.sentence(),
      linea: faker.lorem.sentence(),
      referencia: faker.lorem.sentence(),
      modelo: faker.date.past().getFullYear(),
      kilometraje: faker.number.int(),
      color: faker.lorem.sentence(),
      imagen: faker.image.url()
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService]
    });
    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get', () => {
    service.getVehicles().subscribe();
    const req = httpMock.expectOne(`${environment.baseUrl}202212_MISW4104_Grupo1.json`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch list of vehicles', () => {
    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}202212_MISW4104_Grupo1.json`);
    req.flush(mockVehicles);
  });
});