import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelerWebSiteSharedModule } from '../../shared';
import {
    ImageLinkOpenDataMindService,
    ImageLinkOpenDataMindPopupService,
    ImageLinkOpenDataMindComponent,
    ImageLinkOpenDataMindDetailComponent,
    ImageLinkOpenDataMindDialogComponent,
    ImageLinkOpenDataMindPopupComponent,
    ImageLinkOpenDataMindDeletePopupComponent,
    ImageLinkOpenDataMindDeleteDialogComponent,
    imageLinkRoute,
    imageLinkPopupRoute,
    ImageLinkOpenDataMindResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...imageLinkRoute,
    ...imageLinkPopupRoute,
];

@NgModule({
    imports: [
        TravelerWebSiteSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ImageLinkOpenDataMindComponent,
        ImageLinkOpenDataMindDetailComponent,
        ImageLinkOpenDataMindDialogComponent,
        ImageLinkOpenDataMindDeleteDialogComponent,
        ImageLinkOpenDataMindPopupComponent,
        ImageLinkOpenDataMindDeletePopupComponent,
    ],
    entryComponents: [
        ImageLinkOpenDataMindComponent,
        ImageLinkOpenDataMindDialogComponent,
        ImageLinkOpenDataMindPopupComponent,
        ImageLinkOpenDataMindDeleteDialogComponent,
        ImageLinkOpenDataMindDeletePopupComponent,
    ],
    providers: [
        ImageLinkOpenDataMindService,
        ImageLinkOpenDataMindPopupService,
        ImageLinkOpenDataMindResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelerWebSiteImageLinkOpenDataMindModule {}
