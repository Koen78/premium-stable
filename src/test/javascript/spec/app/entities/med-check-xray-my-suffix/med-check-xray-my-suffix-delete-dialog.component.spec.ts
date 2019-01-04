/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckXrayMySuffixDeleteDialogComponent } from 'app/entities/med-check-xray-my-suffix/med-check-xray-my-suffix-delete-dialog.component';
import { MedCheckXrayMySuffixService } from 'app/entities/med-check-xray-my-suffix/med-check-xray-my-suffix.service';

describe('Component Tests', () => {
    describe('MedCheckXrayMySuffix Management Delete Component', () => {
        let comp: MedCheckXrayMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MedCheckXrayMySuffixDeleteDialogComponent>;
        let service: MedCheckXrayMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckXrayMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(MedCheckXrayMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedCheckXrayMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedCheckXrayMySuffixService);
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
