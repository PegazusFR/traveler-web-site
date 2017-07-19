import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ImageLinkOpenDataMindComponent } from './image-link-open-data-mind.component';
import { ImageLinkOpenDataMindDetailComponent } from './image-link-open-data-mind-detail.component';
import { ImageLinkOpenDataMindPopupComponent } from './image-link-open-data-mind-dialog.component';
import { ImageLinkOpenDataMindDeletePopupComponent } from './image-link-open-data-mind-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ImageLinkOpenDataMindResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const imageLinkRoute: Routes = [
    {
        path: 'image-link-open-data-mind',
        component: ImageLinkOpenDataMindComponent,
        resolve: {
            'pagingParams': ImageLinkOpenDataMindResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.imageLink.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'image-link-open-data-mind/:id',
        component: ImageLinkOpenDataMindDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.imageLink.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imageLinkPopupRoute: Routes = [
    {
        path: 'image-link-open-data-mind-new',
        component: ImageLinkOpenDataMindPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.imageLink.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image-link-open-data-mind/:id/edit',
        component: ImageLinkOpenDataMindPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.imageLink.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'image-link-open-data-mind/:id/delete',
        component: ImageLinkOpenDataMindDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.imageLink.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
