/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { VideoMySuffixDeleteDialogComponent } from 'app/entities/video-my-suffix/video-my-suffix-delete-dialog.component';
import { VideoMySuffixService } from 'app/entities/video-my-suffix/video-my-suffix.service';

describe('Component Tests', () => {
    describe('VideoMySuffix Management Delete Component', () => {
        let comp: VideoMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<VideoMySuffixDeleteDialogComponent>;
        let service: VideoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [VideoMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(VideoMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VideoMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
