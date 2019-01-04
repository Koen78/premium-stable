/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { VideoMySuffixUpdateComponent } from 'app/entities/video-my-suffix/video-my-suffix-update.component';
import { VideoMySuffixService } from 'app/entities/video-my-suffix/video-my-suffix.service';
import { VideoMySuffix } from 'app/shared/model/video-my-suffix.model';

describe('Component Tests', () => {
    describe('VideoMySuffix Management Update Component', () => {
        let comp: VideoMySuffixUpdateComponent;
        let fixture: ComponentFixture<VideoMySuffixUpdateComponent>;
        let service: VideoMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [VideoMySuffixUpdateComponent]
            })
                .overrideTemplate(VideoMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VideoMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VideoMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.video = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VideoMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.video = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
