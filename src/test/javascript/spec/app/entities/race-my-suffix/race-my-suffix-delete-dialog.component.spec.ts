/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { RaceMySuffixDeleteDialogComponent } from 'app/entities/race-my-suffix/race-my-suffix-delete-dialog.component';
import { RaceMySuffixService } from 'app/entities/race-my-suffix/race-my-suffix.service';

describe('Component Tests', () => {
    describe('RaceMySuffix Management Delete Component', () => {
        let comp: RaceMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RaceMySuffixDeleteDialogComponent>;
        let service: RaceMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [RaceMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(RaceMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RaceMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaceMySuffixService);
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
