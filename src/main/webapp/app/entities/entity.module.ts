import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'doctor',
        loadChildren: () => import('./doctor/doctor.module').then(m => m.Test04DoctorModule)
      },
      {
        path: 'visitor',
        loadChildren: () => import('./visitor/visitor.module').then(m => m.Test04VisitorModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Test04EntityModule {}
