/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelJumpingHisMySuffixDeleteDialogComponent } from 'app/entities/level-jumping-his-my-suffix/level-jumping-his-my-suffix-delete-dialog.component';
import { LevelJumpingHisMySuffixService } from 'app/entities/level-jumping-his-my-suffix/level-jumping-his-my-suffix.service';

describe('Component Tests', () => {
    describe('LevelJumpingHisMySuffix Management Delete Component', () => {
        let comp: LevelJumpingHisMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LevelJumpingHisMySuffixDeleteDialogComponent>;
        let service: LevelJumpingHisMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelJumpingHisMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(LevelJumpingHisMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LevelJumpingHisMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelJumpingHisMySuffixService);
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
