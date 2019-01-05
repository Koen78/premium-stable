/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { PersonMySuffixDeleteDialogComponent } from 'app/entities/person-my-suffix/person-my-suffix-delete-dialog.component';
import { PersonMySuffixService } from 'app/entities/person-my-suffix/person-my-suffix.service';

describe('Component Tests', () => {
    describe('PersonMySuffix Management Delete Component', () => {
        let comp: PersonMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PersonMySuffixDeleteDialogComponent>;
        let service: PersonMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [PersonMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PersonMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonMySuffixService);
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
