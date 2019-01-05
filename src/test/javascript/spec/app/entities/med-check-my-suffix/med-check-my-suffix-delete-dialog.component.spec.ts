/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckMySuffixDeleteDialogComponent } from 'app/entities/med-check-my-suffix/med-check-my-suffix-delete-dialog.component';
import { MedCheckMySuffixService } from 'app/entities/med-check-my-suffix/med-check-my-suffix.service';

describe('Component Tests', () => {
    describe('MedCheckMySuffix Management Delete Component', () => {
        let comp: MedCheckMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MedCheckMySuffixDeleteDialogComponent>;
        let service: MedCheckMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(MedCheckMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedCheckMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedCheckMySuffixService);
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
