/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelDressageHisMySuffixUpdateComponent } from 'app/entities/level-dressage-his-my-suffix/level-dressage-his-my-suffix-update.component';
import { LevelDressageHisMySuffixService } from 'app/entities/level-dressage-his-my-suffix/level-dressage-his-my-suffix.service';
import { LevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelDressageHisMySuffix Management Update Component', () => {
        let comp: LevelDressageHisMySuffixUpdateComponent;
        let fixture: ComponentFixture<LevelDressageHisMySuffixUpdateComponent>;
        let service: LevelDressageHisMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelDressageHisMySuffixUpdateComponent]
            })
                .overrideTemplate(LevelDressageHisMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LevelDressageHisMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelDressageHisMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LevelDressageHisMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.levelDressageHis = entity;
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
                    const entity = new LevelDressageHisMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.levelDressageHis = entity;
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
