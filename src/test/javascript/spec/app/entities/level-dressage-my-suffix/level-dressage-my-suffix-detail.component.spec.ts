/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelDressageMySuffixDetailComponent } from 'app/entities/level-dressage-my-suffix/level-dressage-my-suffix-detail.component';
import { LevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelDressageMySuffix Management Detail Component', () => {
        let comp: LevelDressageMySuffixDetailComponent;
        let fixture: ComponentFixture<LevelDressageMySuffixDetailComponent>;
        const route = ({ data: of({ levelDressage: new LevelDressageMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelDressageMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LevelDressageMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LevelDressageMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.levelDressage).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
