import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleService } from '../service/vehicle.service';
import { faker } from '@faker-js/faker';
import { Vehicle } from '../vehicle';

describe('VehicleListComponent', () => {
    let fixture: ComponentFixture<VehicleListComponent>;
    let component: VehicleListComponent;
    let debug: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [
                VehicleListComponent
            ],
            providers: [VehicleService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehicleListComponent);
        component = fixture.componentInstance;

        const vehicles: Vehicle[] = [];
        for (let i = 0; i < 2; i++) {
            const vehicle = new Vehicle(
                faker.number.int().toString(),
                faker.lorem.sentence(),
                faker.lorem.sentence(),
                faker.lorem.sentence(),
                faker.date.past().getFullYear(),
                faker.number.int(),
                faker.lorem.sentence(),
                faker.image.url()
            );
            vehicles.push(vehicle);
        }

        component.vehicles = vehicles;

        fixture.detectChanges();
        debug = fixture.debugElement;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('table should have header', () => {
        const theadTr = debug.queryAll(By.css('thead tr'));
        expect(theadTr.length).toBe(1);
    });

    it('table should have correct headers', () => {
        const headerCells = debug.queryAll(By.css('thead tr th'));
        const expectedHeaders = ['#', 'Marca', 'Línea', 'Modelo'];
        const headerTexts = headerCells.map(he => he.nativeElement.textContent.trim());
        expect(headerTexts).toEqual(expectedHeaders);
    });

    it('table should have 3 rows', () => {
        const vehicles = component.vehicles;
        const tbodyTr = debug.queryAll(By.css('tbody tr'));
        expect(tbodyTr.length).toBe(vehicles.length);
    });

    it('table should display data', () => {
        const vehicles = component.vehicles;
        const tbodyTr = debug.queryAll(By.css('tbody tr'));
        tbodyTr.forEach((row, index) => {
            const cells = row.queryAll(By.css('td'));
            expect(cells[0].nativeElement.textContent).toContain(vehicles[index].id);
            expect(cells[1].nativeElement.textContent).toContain(vehicles[index].marca);
            expect(cells[2].nativeElement.textContent).toContain(vehicles[index].linea);
            expect(cells[3].nativeElement.textContent).toContain(vehicles[index].modelo);
        });
    });
});