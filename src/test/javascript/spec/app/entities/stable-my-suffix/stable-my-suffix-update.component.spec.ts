/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { StableMySuffixUpdateComponent } from 'app/entities/stable-my-suffix/stable-my-suffix-update.component';
import { StableMySuffixService } from 'app/entities/stable-my-suffix/stable-my-suffix.service';
import { StableMySuffix } from 'app/shared/model/stable-my-suffix.model';

describe('Component Tests', () => {
    describe('StableMySuffix Management Update Component', () => {
        let comp: StableMySuffixUpdateComponent;
        let fixture: ComponentFixture<StableMySuffixUpdateComponent>;
        let service: StableMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [StableMySuffixUpdateComponent]
            })
                .overrideTemplate(StableMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StableMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StableMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StableMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stable = entity;
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
                    const entity = new StableMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stable = entity;
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
