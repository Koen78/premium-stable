/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelDressageHisMySuffixDetailComponent } from 'app/entities/level-dressage-his-my-suffix/level-dressage-his-my-suffix-detail.component';
import { LevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelDressageHisMySuffix Management Detail Component', () => {
        let comp: LevelDressageHisMySuffixDetailComponent;
        let fixture: ComponentFixture<LevelDressageHisMySuffixDetailComponent>;
        const route = ({ data: of({ levelDressageHis: new LevelDressageHisMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelDressageHisMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LevelDressageHisMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LevelDressageHisMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.levelDressageHis).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
