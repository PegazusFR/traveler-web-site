import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ImageLinkOpenDataMind } from './image-link-open-data-mind.model';
import { ImageLinkOpenDataMindPopupService } from './image-link-open-data-mind-popup.service';
import { ImageLinkOpenDataMindService } from './image-link-open-data-mind.service';
import { ArticleOpenDataMind, ArticleOpenDataMindService } from '../article';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-image-link-open-data-mind-dialog',
    templateUrl: './image-link-open-data-mind-dialog.component.html'
})
export class ImageLinkOpenDataMindDialogComponent implements OnInit {

    imageLink: ImageLinkOpenDataMind;
    authorities: any[];
    isSaving: boolean;

    articles: ArticleOpenDataMind[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private imageLinkService: ImageLinkOpenDataMindService,
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
        if (this.imageLink.id !== undefined) {
            this.subscribeToSaveResponse(
                this.imageLinkService.update(this.imageLink));
        } else {
            this.subscribeToSaveResponse(
                this.imageLinkService.create(this.imageLink));
        }
    }

    private subscribeToSaveResponse(result: Observable<ImageLinkOpenDataMind>) {
        result.subscribe((res: ImageLinkOpenDataMind) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: ImageLinkOpenDataMind) {
        this.eventManager.broadcast({ name: 'imageLinkListModification', content: 'OK'});
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
    selector: 'jhi-image-link-open-data-mind-popup',
    template: ''
})
export class ImageLinkOpenDataMindPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private imageLinkPopupService: ImageLinkOpenDataMindPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.imageLinkPopupService
                    .open(ImageLinkOpenDataMindDialogComponent, params['id']);
            } else {
                this.modalRef = this.imageLinkPopupService
                    .open(ImageLinkOpenDataMindDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
