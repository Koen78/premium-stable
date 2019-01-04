/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelDressageMySuffixDeleteDialogComponent } from 'app/entities/level-dressage-my-suffix/level-dressage-my-suffix-delete-dialog.component';
import { LevelDressageMySuffixService } from 'app/entities/level-dressage-my-suffix/level-dressage-my-suffix.service';

describe('Component Tests', () => {
    describe('LevelDressageMySuffix Management Delete Component', () => {
        let comp: LevelDressageMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LevelDressageMySuffixDeleteDialogComponent>;
        let service: LevelDressageMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelDressageMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(LevelDressageMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LevelDressageMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelDressageMySuffixService);
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
