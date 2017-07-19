import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ImageLinkOpenDataMind } from './image-link-open-data-mind.model';
import { ImageLinkOpenDataMindPopupService } from './image-link-open-data-mind-popup.service';
import { ImageLinkOpenDataMindService } from './image-link-open-data-mind.service';

@Component({
    selector: 'jhi-image-link-open-data-mind-delete-dialog',
    templateUrl: './image-link-open-data-mind-delete-dialog.component.html'
})
export class ImageLinkOpenDataMindDeleteDialogComponent {

    imageLink: ImageLinkOpenDataMind;

    constructor(
        private imageLinkService: ImageLinkOpenDataMindService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.imageLinkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'imageLinkListModification',
                content: 'Deleted an imageLink'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-image-link-open-data-mind-delete-popup',
    template: ''
})
export class ImageLinkOpenDataMindDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private imageLinkPopupService: ImageLinkOpenDataMindPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.imageLinkPopupService
                .open(ImageLinkOpenDataMindDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
