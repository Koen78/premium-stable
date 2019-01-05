/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { LanguageParamMySuffixComponent } from 'app/entities/language-param-my-suffix/language-param-my-suffix.component';
import { LanguageParamMySuffixService } from 'app/entities/language-param-my-suffix/language-param-my-suffix.service';
import { LanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';

describe('Component Tests', () => {
    describe('LanguageParamMySuffix Management Component', () => {
        let comp: LanguageParamMySuffixComponent;
        let fixture: ComponentFixture<LanguageParamMySuffixComponent>;
        let service: LanguageParamMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LanguageParamMySuffixComponent],
                providers: []
            })
                .overrideTemplate(LanguageParamMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LanguageParamMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LanguageParamMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LanguageParamMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.languageParams[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
