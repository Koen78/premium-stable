/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { StableMySuffixDetailComponent } from 'app/entities/stable-my-suffix/stable-my-suffix-detail.component';
import { StableMySuffix } from 'app/shared/model/stable-my-suffix.model';

describe('Component Tests', () => {
    describe('StableMySuffix Management Detail Component', () => {
        let comp: StableMySuffixDetailComponent;
        let fixture: ComponentFixture<StableMySuffixDetailComponent>;
        const route = ({ data: of({ stable: new StableMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [StableMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StableMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StableMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stable).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
