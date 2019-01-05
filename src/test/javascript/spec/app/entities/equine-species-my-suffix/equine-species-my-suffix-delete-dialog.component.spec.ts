/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { EquineSpeciesMySuffixDeleteDialogComponent } from 'app/entities/equine-species-my-suffix/equine-species-my-suffix-delete-dialog.component';
import { EquineSpeciesMySuffixService } from 'app/entities/equine-species-my-suffix/equine-species-my-suffix.service';

describe('Component Tests', () => {
    describe('EquineSpeciesMySuffix Management Delete Component', () => {
        let comp: EquineSpeciesMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EquineSpeciesMySuffixDeleteDialogComponent>;
        let service: EquineSpeciesMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [EquineSpeciesMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(EquineSpeciesMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EquineSpeciesMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquineSpeciesMySuffixService);
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
