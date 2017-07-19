import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ArticleOpenDataMind } from './article-open-data-mind.model';
import { ArticleOpenDataMindService } from './article-open-data-mind.service';

@Injectable()
export class ArticleOpenDataMindPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private articleService: ArticleOpenDataMindService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.articleService.find(id).subscribe((article) => {
                article.date = this.datePipe
                    .transform(article.date, 'yyyy-MM-ddThh:mm');
                article.dateUpdate = this.datePipe
                    .transform(article.dateUpdate, 'yyyy-MM-ddThh:mm');
                this.articleModalRef(component, article);
            });
        } else {
            return this.articleModalRef(component, new ArticleOpenDataMind());
        }
    }

    articleModalRef(component: Component, article: ArticleOpenDataMind): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.article = article;
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
