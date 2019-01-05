/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { CompetitionMySuffixUpdateComponent } from 'app/entities/competition-my-suffix/competition-my-suffix-update.component';
import { CompetitionMySuffixService } from 'app/entities/competition-my-suffix/competition-my-suffix.service';
import { CompetitionMySuffix } from 'app/shared/model/competition-my-suffix.model';

describe('Component Tests', () => {
    describe('CompetitionMySuffix Management Update Component', () => {
        let comp: CompetitionMySuffixUpdateComponent;
        let fixture: ComponentFixture<CompetitionMySuffixUpdateComponent>;
        let service: CompetitionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [CompetitionMySuffixUpdateComponent]
            })
                .overrideTemplate(CompetitionMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompetitionMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompetitionMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompetitionMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.competition = entity;
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
                    const entity = new CompetitionMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.competition = entity;
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
