import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TravelerWebSiteArticleOpenDataMindModule } from './article/article-open-data-mind.module';
import { TravelerWebSiteImageLinkOpenDataMindModule } from './image-link/image-link-open-data-mind.module';
import { TravelerWebSiteCommentOpenDataMindModule } from './comment/comment-open-data-mind.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TravelerWebSiteArticleOpenDataMindModule,
        TravelerWebSiteImageLinkOpenDataMindModule,
        TravelerWebSiteCommentOpenDataMindModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelerWebSiteEntityModule {}
