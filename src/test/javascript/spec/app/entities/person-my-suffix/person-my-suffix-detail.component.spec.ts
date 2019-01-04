/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { PersonMySuffixDetailComponent } from 'app/entities/person-my-suffix/person-my-suffix-detail.component';
import { PersonMySuffix } from 'app/shared/model/person-my-suffix.model';

describe('Component Tests', () => {
    describe('PersonMySuffix Management Detail Component', () => {
        let comp: PersonMySuffixDetailComponent;
        let fixture: ComponentFixture<PersonMySuffixDetailComponent>;
        const route = ({ data: of({ person: new PersonMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [PersonMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PersonMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.person).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
