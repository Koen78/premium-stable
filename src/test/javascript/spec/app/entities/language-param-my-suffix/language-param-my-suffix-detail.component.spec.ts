/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LanguageParamMySuffixDetailComponent } from 'app/entities/language-param-my-suffix/language-param-my-suffix-detail.component';
import { LanguageParamMySuffix } from 'app/shared/model/language-param-my-suffix.model';

describe('Component Tests', () => {
    describe('LanguageParamMySuffix Management Detail Component', () => {
        let comp: LanguageParamMySuffixDetailComponent;
        let fixture: ComponentFixture<LanguageParamMySuffixDetailComponent>;
        const route = ({ data: of({ languageParam: new LanguageParamMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LanguageParamMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LanguageParamMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LanguageParamMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.languageParam).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
