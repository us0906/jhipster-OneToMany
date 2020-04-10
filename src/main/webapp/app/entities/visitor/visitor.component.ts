import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVisitor } from 'app/shared/model/visitor.model';
import { VisitorService } from './visitor.service';
import { VisitorDeleteDialogComponent } from './visitor-delete-dialog.component';

@Component({
  selector: 'jhi-visitor',
  templateUrl: './visitor.component.html'
})
export class VisitorComponent implements OnInit, OnDestroy {
  visitors?: IVisitor[];
  eventSubscriber?: Subscription;

  constructor(protected visitorService: VisitorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.visitorService.query().subscribe((res: HttpResponse<IVisitor[]>) => (this.visitors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVisitors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVisitor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVisitors(): void {
    this.eventSubscriber = this.eventManager.subscribe('visitorListModification', () => this.loadAll());
  }

  delete(visitor: IVisitor): void {
    const modalRef = this.modalService.open(VisitorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.visitor = visitor;
  }
}
