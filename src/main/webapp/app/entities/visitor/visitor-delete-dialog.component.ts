import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVisitor } from 'app/shared/model/visitor.model';
import { VisitorService } from './visitor.service';

@Component({
  templateUrl: './visitor-delete-dialog.component.html'
})
export class VisitorDeleteDialogComponent {
  visitor?: IVisitor;

  constructor(protected visitorService: VisitorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.visitorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('visitorListModification');
      this.activeModal.close();
    });
  }
}
