import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ArticleOpenDataMindComponent } from './article-open-data-mind.component';
import { ArticleOpenDataMindDetailComponent } from './article-open-data-mind-detail.component';
import { ArticleOpenDataMindPopupComponent } from './article-open-data-mind-dialog.component';
import { ArticleOpenDataMindDeletePopupComponent } from './article-open-data-mind-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ArticleOpenDataMindResolvePagingParams implements Resolve<any> {

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

export const articleRoute: Routes = [
    {
        path: 'article-open-data-mind',
        component: ArticleOpenDataMindComponent,
        resolve: {
            'pagingParams': ArticleOpenDataMindResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'article-open-data-mind/:id',
        component: ArticleOpenDataMindDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articlePopupRoute: Routes = [
    {
        path: 'article-open-data-mind-new',
        component: ArticleOpenDataMindPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'article-open-data-mind/:id/edit',
        component: ArticleOpenDataMindPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'article-open-data-mind/:id/delete',
        component: ArticleOpenDataMindDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelerWebSiteApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
