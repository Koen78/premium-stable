/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { HorseMySuffixDeleteDialogComponent } from 'app/entities/horse-my-suffix/horse-my-suffix-delete-dialog.component';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix/horse-my-suffix.service';

describe('Component Tests', () => {
    describe('HorseMySuffix Management Delete Component', () => {
        let comp: HorseMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<HorseMySuffixDeleteDialogComponent>;
        let service: HorseMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [HorseMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(HorseMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HorseMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HorseMySuffixService);
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
