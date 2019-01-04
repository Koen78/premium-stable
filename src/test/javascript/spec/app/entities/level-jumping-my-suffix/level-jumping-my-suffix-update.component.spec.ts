/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelJumpingMySuffixUpdateComponent } from 'app/entities/level-jumping-my-suffix/level-jumping-my-suffix-update.component';
import { LevelJumpingMySuffixService } from 'app/entities/level-jumping-my-suffix/level-jumping-my-suffix.service';
import { LevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelJumpingMySuffix Management Update Component', () => {
        let comp: LevelJumpingMySuffixUpdateComponent;
        let fixture: ComponentFixture<LevelJumpingMySuffixUpdateComponent>;
        let service: LevelJumpingMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelJumpingMySuffixUpdateComponent]
            })
                .overrideTemplate(LevelJumpingMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LevelJumpingMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelJumpingMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LevelJumpingMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.levelJumping = entity;
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
                    const entity = new LevelJumpingMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.levelJumping = entity;
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
