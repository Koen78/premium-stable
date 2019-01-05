/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelJumpingMySuffixDeleteDialogComponent } from 'app/entities/level-jumping-my-suffix/level-jumping-my-suffix-delete-dialog.component';
import { LevelJumpingMySuffixService } from 'app/entities/level-jumping-my-suffix/level-jumping-my-suffix.service';

describe('Component Tests', () => {
    describe('LevelJumpingMySuffix Management Delete Component', () => {
        let comp: LevelJumpingMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LevelJumpingMySuffixDeleteDialogComponent>;
        let service: LevelJumpingMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelJumpingMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(LevelJumpingMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LevelJumpingMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelJumpingMySuffixService);
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
