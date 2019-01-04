/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { HorseMySuffixUpdateComponent } from 'app/entities/horse-my-suffix/horse-my-suffix-update.component';
import { HorseMySuffixService } from 'app/entities/horse-my-suffix/horse-my-suffix.service';
import { HorseMySuffix } from 'app/shared/model/horse-my-suffix.model';

describe('Component Tests', () => {
    describe('HorseMySuffix Management Update Component', () => {
        let comp: HorseMySuffixUpdateComponent;
        let fixture: ComponentFixture<HorseMySuffixUpdateComponent>;
        let service: HorseMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [HorseMySuffixUpdateComponent]
            })
                .overrideTemplate(HorseMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HorseMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HorseMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HorseMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.horse = entity;
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
                    const entity = new HorseMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.horse = entity;
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
