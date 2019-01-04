/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { RaceMySuffixUpdateComponent } from 'app/entities/race-my-suffix/race-my-suffix-update.component';
import { RaceMySuffixService } from 'app/entities/race-my-suffix/race-my-suffix.service';
import { RaceMySuffix } from 'app/shared/model/race-my-suffix.model';

describe('Component Tests', () => {
    describe('RaceMySuffix Management Update Component', () => {
        let comp: RaceMySuffixUpdateComponent;
        let fixture: ComponentFixture<RaceMySuffixUpdateComponent>;
        let service: RaceMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [RaceMySuffixUpdateComponent]
            })
                .overrideTemplate(RaceMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RaceMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RaceMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RaceMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.race = entity;
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
                    const entity = new RaceMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.race = entity;
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
