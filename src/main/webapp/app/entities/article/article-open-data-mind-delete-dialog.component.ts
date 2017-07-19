import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ArticleOpenDataMind } from './article-open-data-mind.model';
import { ArticleOpenDataMindPopupService } from './article-open-data-mind-popup.service';
import { ArticleOpenDataMindService } from './article-open-data-mind.service';

@Component({
    selector: 'jhi-article-open-data-mind-delete-dialog',
    templateUrl: './article-open-data-mind-delete-dialog.component.html'
})
export class ArticleOpenDataMindDeleteDialogComponent {

    article: ArticleOpenDataMind;

    constructor(
        private articleService: ArticleOpenDataMindService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.articleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'articleListModification',
                content: 'Deleted an article'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-article-open-data-mind-delete-popup',
    template: ''
})
export class ArticleOpenDataMindDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private articlePopupService: ArticleOpenDataMindPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.articlePopupService
                .open(ArticleOpenDataMindDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
