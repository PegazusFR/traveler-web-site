import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { ImageLinkOpenDataMind } from './image-link-open-data-mind.model';
import { ImageLinkOpenDataMindService } from './image-link-open-data-mind.service';

@Component({
    selector: 'jhi-image-link-open-data-mind-detail',
    templateUrl: './image-link-open-data-mind-detail.component.html'
})
export class ImageLinkOpenDataMindDetailComponent implements OnInit, OnDestroy {

    imageLink: ImageLinkOpenDataMind;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private imageLinkService: ImageLinkOpenDataMindService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInImageLinks();
    }

    load(id) {
        this.imageLinkService.find(id).subscribe((imageLink) => {
            this.imageLink = imageLink;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInImageLinks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'imageLinkListModification',
            (response) => this.load(this.imageLink.id)
        );
    }
}
