/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { VideoMySuffixDetailComponent } from 'app/entities/video-my-suffix/video-my-suffix-detail.component';
import { VideoMySuffix } from 'app/shared/model/video-my-suffix.model';

describe('Component Tests', () => {
    describe('VideoMySuffix Management Detail Component', () => {
        let comp: VideoMySuffixDetailComponent;
        let fixture: ComponentFixture<VideoMySuffixDetailComponent>;
        const route = ({ data: of({ video: new VideoMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [VideoMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VideoMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VideoMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.video).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
