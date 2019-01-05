/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelJumpingMySuffixDetailComponent } from 'app/entities/level-jumping-my-suffix/level-jumping-my-suffix-detail.component';
import { LevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelJumpingMySuffix Management Detail Component', () => {
        let comp: LevelJumpingMySuffixDetailComponent;
        let fixture: ComponentFixture<LevelJumpingMySuffixDetailComponent>;
        const route = ({ data: of({ levelJumping: new LevelJumpingMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelJumpingMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LevelJumpingMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LevelJumpingMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.levelJumping).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
