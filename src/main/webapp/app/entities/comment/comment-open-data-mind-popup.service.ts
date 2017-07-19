import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CommentOpenDataMind } from './comment-open-data-mind.model';
import { CommentOpenDataMindService } from './comment-open-data-mind.service';

@Injectable()
export class CommentOpenDataMindPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private commentService: CommentOpenDataMindService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.commentService.find(id).subscribe((comment) => {
                comment.date = this.datePipe
                    .transform(comment.date, 'yyyy-MM-ddThh:mm');
                this.commentModalRef(component, comment);
            });
        } else {
            return this.commentModalRef(component, new CommentOpenDataMind());
        }
    }

    commentModalRef(component: Component, comment: CommentOpenDataMind): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.comment = comment;
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
