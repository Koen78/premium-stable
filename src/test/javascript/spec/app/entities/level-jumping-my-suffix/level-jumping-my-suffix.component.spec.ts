/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelJumpingMySuffixComponent } from 'app/entities/level-jumping-my-suffix/level-jumping-my-suffix.component';
import { LevelJumpingMySuffixService } from 'app/entities/level-jumping-my-suffix/level-jumping-my-suffix.service';
import { LevelJumpingMySuffix } from 'app/shared/model/level-jumping-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelJumpingMySuffix Management Component', () => {
        let comp: LevelJumpingMySuffixComponent;
        let fixture: ComponentFixture<LevelJumpingMySuffixComponent>;
        let service: LevelJumpingMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelJumpingMySuffixComponent],
                providers: []
            })
                .overrideTemplate(LevelJumpingMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LevelJumpingMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelJumpingMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LevelJumpingMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.levelJumpings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
