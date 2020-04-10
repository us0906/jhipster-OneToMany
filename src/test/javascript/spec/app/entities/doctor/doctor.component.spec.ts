import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Test04TestModule } from '../../../test.module';
import { DoctorComponent } from 'app/entities/doctor/doctor.component';
import { DoctorService } from 'app/entities/doctor/doctor.service';
import { Doctor } from 'app/shared/model/doctor.model';

describe('Component Tests', () => {
  describe('Doctor Management Component', () => {
    let comp: DoctorComponent;
    let fixture: ComponentFixture<DoctorComponent>;
    let service: DoctorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Test04TestModule],
        declarations: [DoctorComponent]
      })
        .overrideTemplate(DoctorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DoctorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoctorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Doctor(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.doctors && comp.doctors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
