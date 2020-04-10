import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Test04TestModule } from '../../../test.module';
import { VisitorDetailComponent } from 'app/entities/visitor/visitor-detail.component';
import { Visitor } from 'app/shared/model/visitor.model';

describe('Component Tests', () => {
  describe('Visitor Management Detail Component', () => {
    let comp: VisitorDetailComponent;
    let fixture: ComponentFixture<VisitorDetailComponent>;
    const route = ({ data: of({ visitor: new Visitor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Test04TestModule],
        declarations: [VisitorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VisitorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VisitorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load visitor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.visitor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
