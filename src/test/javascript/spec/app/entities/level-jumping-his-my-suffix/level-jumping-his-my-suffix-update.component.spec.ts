/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelJumpingHisMySuffixUpdateComponent } from 'app/entities/level-jumping-his-my-suffix/level-jumping-his-my-suffix-update.component';
import { LevelJumpingHisMySuffixService } from 'app/entities/level-jumping-his-my-suffix/level-jumping-his-my-suffix.service';
import { LevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelJumpingHisMySuffix Management Update Component', () => {
        let comp: LevelJumpingHisMySuffixUpdateComponent;
        let fixture: ComponentFixture<LevelJumpingHisMySuffixUpdateComponent>;
        let service: LevelJumpingHisMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelJumpingHisMySuffixUpdateComponent]
            })
                .overrideTemplate(LevelJumpingHisMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LevelJumpingHisMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelJumpingHisMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LevelJumpingHisMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.levelJumpingHis = entity;
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
                    const entity = new LevelJumpingHisMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.levelJumpingHis = entity;
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
