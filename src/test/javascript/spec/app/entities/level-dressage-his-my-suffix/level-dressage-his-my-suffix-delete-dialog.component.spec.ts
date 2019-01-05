/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelDressageHisMySuffixDeleteDialogComponent } from 'app/entities/level-dressage-his-my-suffix/level-dressage-his-my-suffix-delete-dialog.component';
import { LevelDressageHisMySuffixService } from 'app/entities/level-dressage-his-my-suffix/level-dressage-his-my-suffix.service';

describe('Component Tests', () => {
    describe('LevelDressageHisMySuffix Management Delete Component', () => {
        let comp: LevelDressageHisMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LevelDressageHisMySuffixDeleteDialogComponent>;
        let service: LevelDressageHisMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelDressageHisMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(LevelDressageHisMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LevelDressageHisMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelDressageHisMySuffixService);
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
