/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { ColorMySuffixUpdateComponent } from 'app/entities/color-my-suffix/color-my-suffix-update.component';
import { ColorMySuffixService } from 'app/entities/color-my-suffix/color-my-suffix.service';
import { ColorMySuffix } from 'app/shared/model/color-my-suffix.model';

describe('Component Tests', () => {
    describe('ColorMySuffix Management Update Component', () => {
        let comp: ColorMySuffixUpdateComponent;
        let fixture: ComponentFixture<ColorMySuffixUpdateComponent>;
        let service: ColorMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [ColorMySuffixUpdateComponent]
            })
                .overrideTemplate(ColorMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ColorMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColorMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ColorMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.color = entity;
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
                    const entity = new ColorMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.color = entity;
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
