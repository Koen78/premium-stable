/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelJumpingHisMySuffixDetailComponent } from 'app/entities/level-jumping-his-my-suffix/level-jumping-his-my-suffix-detail.component';
import { LevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelJumpingHisMySuffix Management Detail Component', () => {
        let comp: LevelJumpingHisMySuffixDetailComponent;
        let fixture: ComponentFixture<LevelJumpingHisMySuffixDetailComponent>;
        const route = ({ data: of({ levelJumpingHis: new LevelJumpingHisMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelJumpingHisMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LevelJumpingHisMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LevelJumpingHisMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.levelJumpingHis).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
