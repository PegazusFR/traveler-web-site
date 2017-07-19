import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommentOpenDataMind } from './comment-open-data-mind.model';
import { CommentOpenDataMindPopupService } from './comment-open-data-mind-popup.service';
import { CommentOpenDataMindService } from './comment-open-data-mind.service';

@Component({
    selector: 'jhi-comment-open-data-mind-delete-dialog',
    templateUrl: './comment-open-data-mind-delete-dialog.component.html'
})
export class CommentOpenDataMindDeleteDialogComponent {

    comment: CommentOpenDataMind;

    constructor(
        private commentService: CommentOpenDataMindService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentListModification',
                content: 'Deleted an comment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comment-open-data-mind-delete-popup',
    template: ''
})
export class CommentOpenDataMindDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentOpenDataMindPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.commentPopupService
                .open(CommentOpenDataMindDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
