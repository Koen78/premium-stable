/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LanguageParamMySuffixUpdateComponent } from 'app/entities/language-param-my-suffix/language-param-my-suffix-update.component';
import { LanguageParamMySuffixService } from 'app/entities/language-param-my-suffix/language-param-my-suffix.service';
import { LanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';

describe('Component Tests', () => {
    describe('LanguageParamMySuffix Management Update Component', () => {
        let comp: LanguageParamMySuffixUpdateComponent;
        let fixture: ComponentFixture<LanguageParamMySuffixUpdateComponent>;
        let service: LanguageParamMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LanguageParamMySuffixUpdateComponent]
            })
                .overrideTemplate(LanguageParamMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LanguageParamMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageParamMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LanguageParamMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.languageParam = entity;
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
                    const entity = new LanguageParamMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.languageParam = entity;
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
