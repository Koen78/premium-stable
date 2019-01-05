/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { EquineSpeciesMySuffixUpdateComponent } from 'app/entities/equine-species-my-suffix/equine-species-my-suffix-update.component';
import { EquineSpeciesMySuffixService } from 'app/entities/equine-species-my-suffix/equine-species-my-suffix.service';
import { EquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';

describe('Component Tests', () => {
    describe('EquineSpeciesMySuffix Management Update Component', () => {
        let comp: EquineSpeciesMySuffixUpdateComponent;
        let fixture: ComponentFixture<EquineSpeciesMySuffixUpdateComponent>;
        let service: EquineSpeciesMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [EquineSpeciesMySuffixUpdateComponent]
            })
                .overrideTemplate(EquineSpeciesMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EquineSpeciesMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquineSpeciesMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EquineSpeciesMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.equineSpecies = entity;
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
                    const entity = new EquineSpeciesMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.equineSpecies = entity;
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
