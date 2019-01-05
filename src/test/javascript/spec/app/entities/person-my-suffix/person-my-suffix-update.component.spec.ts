/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { PersonMySuffixUpdateComponent } from 'app/entities/person-my-suffix/person-my-suffix-update.component';
import { PersonMySuffixService } from 'app/entities/person-my-suffix/person-my-suffix.service';
import { PersonMySuffix } from 'app/shared/model/person-my-suffix.model';

describe('Component Tests', () => {
    describe('PersonMySuffix Management Update Component', () => {
        let comp: PersonMySuffixUpdateComponent;
        let fixture: ComponentFixture<PersonMySuffixUpdateComponent>;
        let service: PersonMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [PersonMySuffixUpdateComponent]
            })
                .overrideTemplate(PersonMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PersonMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PersonMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.person = entity;
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
                    const entity = new PersonMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.person = entity;
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
