import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelerWebSiteSharedModule } from '../../shared';
import {
    ArticleOpenDataMindService,
    ArticleOpenDataMindPopupService,
    ArticleOpenDataMindComponent,
    ArticleOpenDataMindDetailComponent,
    ArticleOpenDataMindDialogComponent,
    ArticleOpenDataMindPopupComponent,
    ArticleOpenDataMindDeletePopupComponent,
    ArticleOpenDataMindDeleteDialogComponent,
    articleRoute,
    articlePopupRoute,
    ArticleOpenDataMindResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...articleRoute,
    ...articlePopupRoute,
];

@NgModule({
    imports: [
        TravelerWebSiteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ArticleOpenDataMindComponent,
        ArticleOpenDataMindDetailComponent,
        ArticleOpenDataMindDialogComponent,
        ArticleOpenDataMindDeleteDialogComponent,
        ArticleOpenDataMindPopupComponent,
        ArticleOpenDataMindDeletePopupComponent,
    ],
    entryComponents: [
        ArticleOpenDataMindComponent,
        ArticleOpenDataMindDialogComponent,
        ArticleOpenDataMindPopupComponent,
        ArticleOpenDataMindDeleteDialogComponent,
        ArticleOpenDataMindDeletePopupComponent,
    ],
    providers: [
        ArticleOpenDataMindService,
        ArticleOpenDataMindPopupService,
        ArticleOpenDataMindResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelerWebSiteArticleOpenDataMindModule {}
