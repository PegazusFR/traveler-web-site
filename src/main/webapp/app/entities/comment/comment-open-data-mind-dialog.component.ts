import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommentOpenDataMind } from './comment-open-data-mind.model';
import { CommentOpenDataMindPopupService } from './comment-open-data-mind-popup.service';
import { CommentOpenDataMindService } from './comment-open-data-mind.service';
import { ArticleOpenDataMind, ArticleOpenDataMindService } from '../article';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-comment-open-data-mind-dialog',
    templateUrl: './comment-open-data-mind-dialog.component.html'
})
export class CommentOpenDataMindDialogComponent implements OnInit {

    comment: CommentOpenDataMind;
    authorities: any[];
    isSaving: boolean;

    articles: ArticleOpenDataMind[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private commentService: CommentOpenDataMindService,
        private articleService: ArticleOpenDataMindService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.articleService.query()
            .subscribe((res: ResponseWrapper) => { this.articles = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(
                this.commentService.create(this.comment));
        }
    }

    private subscribeToSaveResponse(result: Observable<CommentOpenDataMind>) {
        result.subscribe((res: CommentOpenDataMind) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: CommentOpenDataMind) {
        this.eventManager.broadcast({ name: 'commentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackArticleById(index: number, item: ArticleOpenDataMind) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-comment-open-data-mind-popup',
    template: ''
})
export class CommentOpenDataMindPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentOpenDataMindPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.commentPopupService
                    .open(CommentOpenDataMindDialogComponent, params['id']);
            } else {
                this.modalRef = this.commentPopupService
                    .open(CommentOpenDataMindDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
