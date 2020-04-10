import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Test04SharedModule } from 'app/shared/shared.module';
import { DoctorComponent } from './doctor.component';
import { DoctorDetailComponent } from './doctor-detail.component';
import { DoctorUpdateComponent } from './doctor-update.component';
import { DoctorDeleteDialogComponent } from './doctor-delete-dialog.component';
import { doctorRoute } from './doctor.route';

@NgModule({
  imports: [Test04SharedModule, RouterModule.forChild(doctorRoute)],
  declarations: [DoctorComponent, DoctorDetailComponent, DoctorUpdateComponent, DoctorDeleteDialogComponent],
  entryComponents: [DoctorDeleteDialogComponent]
})
export class Test04DoctorModule {}
