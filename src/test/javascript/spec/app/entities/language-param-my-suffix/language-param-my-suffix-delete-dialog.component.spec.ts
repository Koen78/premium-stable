/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PremiumStableTestModule } from '../../../test.module';
import { LanguageParamMySuffixDeleteDialogComponent } from 'app/entities/language-param-my-suffix/language-param-my-suffix-delete-dialog.component';
import { LanguageParamMySuffixService } from 'app/entities/language-param-my-suffix/language-param-my-suffix.service';

describe('Component Tests', () => {
    describe('LanguageParamMySuffix Management Delete Component', () => {
        let comp: LanguageParamMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LanguageParamMySuffixDeleteDialogComponent>;
        let service: LanguageParamMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LanguageParamMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(LanguageParamMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LanguageParamMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageParamMySuffixService);
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
