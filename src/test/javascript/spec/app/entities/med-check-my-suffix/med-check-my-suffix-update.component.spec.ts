/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckMySuffixUpdateComponent } from 'app/entities/med-check-my-suffix/med-check-my-suffix-update.component';
import { MedCheckMySuffixService } from 'app/entities/med-check-my-suffix/med-check-my-suffix.service';
import { MedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckMySuffix Management Update Component', () => {
        let comp: MedCheckMySuffixUpdateComponent;
        let fixture: ComponentFixture<MedCheckMySuffixUpdateComponent>;
        let service: MedCheckMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckMySuffixUpdateComponent]
            })
                .overrideTemplate(MedCheckMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedCheckMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedCheckMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MedCheckMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medCheck = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MedCheckMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medCheck = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
