import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Test04SharedModule } from 'app/shared/shared.module';
import { VisitorComponent } from './visitor.component';
import { VisitorDetailComponent } from './visitor-detail.component';
import { VisitorUpdateComponent } from './visitor-update.component';
import { VisitorDeleteDialogComponent } from './visitor-delete-dialog.component';
import { visitorRoute } from './visitor.route';

@NgModule({
  imports: [Test04SharedModule, RouterModule.forChild(visitorRoute)],
  declarations: [VisitorComponent, VisitorDetailComponent, VisitorUpdateComponent, VisitorDeleteDialogComponent],
  entryComponents: [VisitorDeleteDialogComponent]
})
export class Test04VisitorModule {}
