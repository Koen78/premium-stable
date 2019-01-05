/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckDetMySuffixUpdateComponent } from 'app/entities/med-check-det-my-suffix/med-check-det-my-suffix-update.component';
import { MedCheckDetMySuffixService } from 'app/entities/med-check-det-my-suffix/med-check-det-my-suffix.service';
import { MedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckDetMySuffix Management Update Component', () => {
        let comp: MedCheckDetMySuffixUpdateComponent;
        let fixture: ComponentFixture<MedCheckDetMySuffixUpdateComponent>;
        let service: MedCheckDetMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckDetMySuffixUpdateComponent]
            })
                .overrideTemplate(MedCheckDetMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedCheckDetMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedCheckDetMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MedCheckDetMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medCheckDet = entity;
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
                    const entity = new MedCheckDetMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medCheckDet = entity;
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
