import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ImageLinkOpenDataMind } from './image-link-open-data-mind.model';
import { ImageLinkOpenDataMindService } from './image-link-open-data-mind.service';

@Injectable()
export class ImageLinkOpenDataMindPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private imageLinkService: ImageLinkOpenDataMindService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.imageLinkService.find(id).subscribe((imageLink) => {
                imageLink.date = this.datePipe
                    .transform(imageLink.date, 'yyyy-MM-ddThh:mm');
                this.imageLinkModalRef(component, imageLink);
            });
        } else {
            return this.imageLinkModalRef(component, new ImageLinkOpenDataMind());
        }
    }

    imageLinkModalRef(component: Component, imageLink: ImageLinkOpenDataMind): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.imageLink = imageLink;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
