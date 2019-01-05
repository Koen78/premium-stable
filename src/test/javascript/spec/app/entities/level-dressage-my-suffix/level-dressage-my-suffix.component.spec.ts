/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelDressageMySuffixComponent } from 'app/entities/level-dressage-my-suffix/level-dressage-my-suffix.component';
import { LevelDressageMySuffixService } from 'app/entities/level-dressage-my-suffix/level-dressage-my-suffix.service';
import { LevelDressageMySuffix } from 'app/shared/model/level-dressage-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelDressageMySuffix Management Component', () => {
        let comp: LevelDressageMySuffixComponent;
        let fixture: ComponentFixture<LevelDressageMySuffixComponent>;
        let service: LevelDressageMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelDressageMySuffixComponent],
                providers: []
            })
                .overrideTemplate(LevelDressageMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LevelDressageMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelDressageMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LevelDressageMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.levelDressages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
