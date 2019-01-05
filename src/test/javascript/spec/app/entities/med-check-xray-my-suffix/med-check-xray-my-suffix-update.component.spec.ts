/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckXrayMySuffixUpdateComponent } from 'app/entities/med-check-xray-my-suffix/med-check-xray-my-suffix-update.component';
import { MedCheckXrayMySuffixService } from 'app/entities/med-check-xray-my-suffix/med-check-xray-my-suffix.service';
import { MedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckXrayMySuffix Management Update Component', () => {
        let comp: MedCheckXrayMySuffixUpdateComponent;
        let fixture: ComponentFixture<MedCheckXrayMySuffixUpdateComponent>;
        let service: MedCheckXrayMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckXrayMySuffixUpdateComponent]
            })
                .overrideTemplate(MedCheckXrayMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedCheckXrayMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedCheckXrayMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MedCheckXrayMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medCheckXray = entity;
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
                    const entity = new MedCheckXrayMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medCheckXray = entity;
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
