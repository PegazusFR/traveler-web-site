/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TravelerWebSiteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ArticleOpenDataMindDetailComponent } from '../../../../../../main/webapp/app/entities/article/article-open-data-mind-detail.component';
import { ArticleOpenDataMindService } from '../../../../../../main/webapp/app/entities/article/article-open-data-mind.service';
import { ArticleOpenDataMind } from '../../../../../../main/webapp/app/entities/article/article-open-data-mind.model';

describe('Component Tests', () => {

    describe('ArticleOpenDataMind Management Detail Component', () => {
        let comp: ArticleOpenDataMindDetailComponent;
        let fixture: ComponentFixture<ArticleOpenDataMindDetailComponent>;
        let service: ArticleOpenDataMindService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelerWebSiteTestModule],
                declarations: [ArticleOpenDataMindDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ArticleOpenDataMindService,
                    JhiEventManager
                ]
            }).overrideTemplate(ArticleOpenDataMindDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArticleOpenDataMindDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleOpenDataMindService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ArticleOpenDataMind(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.article).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
