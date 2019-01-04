/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { VideoMySuffixComponent } from 'app/entities/video-my-suffix/video-my-suffix.component';
import { VideoMySuffixService } from 'app/entities/video-my-suffix/video-my-suffix.service';
import { VideoMySuffix } from 'app/shared/model/video-my-suffix.model';

describe('Component Tests', () => {
    describe('VideoMySuffix Management Component', () => {
        let comp: VideoMySuffixComponent;
        let fixture: ComponentFixture<VideoMySuffixComponent>;
        let service: VideoMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [VideoMySuffixComponent],
                providers: []
            })
                .overrideTemplate(VideoMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VideoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VideoMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.videos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
