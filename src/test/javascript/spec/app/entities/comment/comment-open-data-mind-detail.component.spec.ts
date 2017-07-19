/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TravelerWebSiteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CommentOpenDataMindDetailComponent } from '../../../../../../main/webapp/app/entities/comment/comment-open-data-mind-detail.component';
import { CommentOpenDataMindService } from '../../../../../../main/webapp/app/entities/comment/comment-open-data-mind.service';
import { CommentOpenDataMind } from '../../../../../../main/webapp/app/entities/comment/comment-open-data-mind.model';

describe('Component Tests', () => {

    describe('CommentOpenDataMind Management Detail Component', () => {
        let comp: CommentOpenDataMindDetailComponent;
        let fixture: ComponentFixture<CommentOpenDataMindDetailComponent>;
        let service: CommentOpenDataMindService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelerWebSiteTestModule],
                declarations: [CommentOpenDataMindDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CommentOpenDataMindService,
                    JhiEventManager
                ]
            }).overrideTemplate(CommentOpenDataMindDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentOpenDataMindDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentOpenDataMindService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CommentOpenDataMind(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.comment).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
