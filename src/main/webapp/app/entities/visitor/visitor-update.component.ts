import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVisitor, Visitor } from 'app/shared/model/visitor.model';
import { VisitorService } from './visitor.service';
import { IDoctor } from 'app/shared/model/doctor.model';
import { DoctorService } from 'app/entities/doctor/doctor.service';

@Component({
  selector: 'jhi-visitor-update',
  templateUrl: './visitor-update.component.html'
})
export class VisitorUpdateComponent implements OnInit {
  isSaving = false;
  doctors: IDoctor[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    doctor: []
  });

  constructor(
    protected visitorService: VisitorService,
    protected doctorService: DoctorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ visitor }) => {
      this.updateForm(visitor);

      this.doctorService.query().subscribe((res: HttpResponse<IDoctor[]>) => (this.doctors = res.body || []));
    });
  }

  updateForm(visitor: IVisitor): void {
    this.editForm.patchValue({
      id: visitor.id,
      name: visitor.name,
      doctor: visitor.doctor
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const visitor = this.createFromForm();
    if (visitor.id !== undefined) {
      this.subscribeToSaveResponse(this.visitorService.update(visitor));
    } else {
      this.subscribeToSaveResponse(this.visitorService.create(visitor));
    }
  }

  private createFromForm(): IVisitor {
    return {
      ...new Visitor(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      doctor: this.editForm.get(['doctor'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisitor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDoctor): any {
    return item.id;
  }
}
