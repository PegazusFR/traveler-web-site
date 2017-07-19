import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CommentOpenDataMindComponent } from './comment-open-data-mind.component';
import { CommentOpenDataMindDetailComponent } from './comment-open-data-mind-detail.component';
import { CommentOpenDataMindPopupComponent } from './comment-open-data-mind-dialog.component';
import { CommentOpenDataMindDeletePopupComponent } from './comment-open-data-mind-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class CommentOpenDataMindResolvePagingParams implements Resolve<any> {

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

export const commentRoute: Routes = [
    {
        path: 'comment-open-data-mind',
        component: CommentOpenDataMindComponent,
        resolve: {
            'pagingParams': CommentOpenDataMindResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comment-open-data-mind/:id',
        component: CommentOpenDataMindDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentPopupRoute: Routes = [
    {
        path: 'comment-open-data-mind-new',
        component: CommentOpenDataMindPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-open-data-mind/:id/edit',
        component: CommentOpenDataMindPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-open-data-mind/:id/delete',
        component: CommentOpenDataMindDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.comment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
