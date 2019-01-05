/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { GenderMySuffixDeleteDialogComponent } from 'app/entities/gender-my-suffix/gender-my-suffix-delete-dialog.component';
import { GenderMySuffixService } from 'app/entities/gender-my-suffix/gender-my-suffix.service';

describe('Component Tests', () => {
    describe('GenderMySuffix Management Delete Component', () => {
        let comp: GenderMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<GenderMySuffixDeleteDialogComponent>;
        let service: GenderMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [GenderMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(GenderMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GenderMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenderMySuffixService);
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
