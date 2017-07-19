/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TravelerWebSiteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ImageLinkOpenDataMindDetailComponent } from '../../../../../../main/webapp/app/entities/image-link/image-link-open-data-mind-detail.component';
import { ImageLinkOpenDataMindService } from '../../../../../../main/webapp/app/entities/image-link/image-link-open-data-mind.service';
import { ImageLinkOpenDataMind } from '../../../../../../main/webapp/app/entities/image-link/image-link-open-data-mind.model';

describe('Component Tests', () => {

    describe('ImageLinkOpenDataMind Management Detail Component', () => {
        let comp: ImageLinkOpenDataMindDetailComponent;
        let fixture: ComponentFixture<ImageLinkOpenDataMindDetailComponent>;
        let service: ImageLinkOpenDataMindService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelerWebSiteTestModule],
                declarations: [ImageLinkOpenDataMindDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ImageLinkOpenDataMindService,
                    JhiEventManager
                ]
            }).overrideTemplate(ImageLinkOpenDataMindDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImageLinkOpenDataMindDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageLinkOpenDataMindService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ImageLinkOpenDataMind(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.imageLink).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
