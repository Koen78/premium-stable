/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelDressageMySuffixUpdateComponent } from 'app/entities/level-dressage-my-suffix/level-dressage-my-suffix-update.component';
import { LevelDressageMySuffixService } from 'app/entities/level-dressage-my-suffix/level-dressage-my-suffix.service';
import { LevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelDressageMySuffix Management Update Component', () => {
        let comp: LevelDressageMySuffixUpdateComponent;
        let fixture: ComponentFixture<LevelDressageMySuffixUpdateComponent>;
        let service: LevelDressageMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelDressageMySuffixUpdateComponent]
            })
                .overrideTemplate(LevelDressageMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LevelDressageMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelDressageMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LevelDressageMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.levelDressage = entity;
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
                    const entity = new LevelDressageMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.levelDressage = entity;
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
