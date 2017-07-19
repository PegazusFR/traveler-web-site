import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelerWebSiteSharedModule } from '../../shared';
import {
    CommentOpenDataMindService,
    CommentOpenDataMindPopupService,
    CommentOpenDataMindComponent,
    CommentOpenDataMindDetailComponent,
    CommentOpenDataMindDialogComponent,
    CommentOpenDataMindPopupComponent,
    CommentOpenDataMindDeletePopupComponent,
    CommentOpenDataMindDeleteDialogComponent,
    commentRoute,
    commentPopupRoute,
    CommentOpenDataMindResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...commentRoute,
    ...commentPopupRoute,
];

@NgModule({
    imports: [
        TravelerWebSiteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CommentOpenDataMindComponent,
        CommentOpenDataMindDetailComponent,
        CommentOpenDataMindDialogComponent,
        CommentOpenDataMindDeleteDialogComponent,
        CommentOpenDataMindPopupComponent,
        CommentOpenDataMindDeletePopupComponent,
    ],
    entryComponents: [
        CommentOpenDataMindComponent,
        CommentOpenDataMindDialogComponent,
        CommentOpenDataMindPopupComponent,
        CommentOpenDataMindDeleteDialogComponent,
        CommentOpenDataMindDeletePopupComponent,
    ],
    providers: [
        CommentOpenDataMindService,
        CommentOpenDataMindPopupService,
        CommentOpenDataMindResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelerWebSiteCommentOpenDataMindModule {}
