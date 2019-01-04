/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelJumpingHisMySuffixComponent } from 'app/entities/level-jumping-his-my-suffix/level-jumping-his-my-suffix.component';
import { LevelJumpingHisMySuffixService } from 'app/entities/level-jumping-his-my-suffix/level-jumping-his-my-suffix.service';
import { LevelJumpingHisMySuffix } from 'app/shared/model/level-jumping-his-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelJumpingHisMySuffix Management Component', () => {
        let comp: LevelJumpingHisMySuffixComponent;
        let fixture: ComponentFixture<LevelJumpingHisMySuffixComponent>;
        let service: LevelJumpingHisMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelJumpingHisMySuffixComponent],
                providers: []
            })
                .overrideTemplate(LevelJumpingHisMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LevelJumpingHisMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelJumpingHisMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LevelJumpingHisMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.levelJumpingHis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
