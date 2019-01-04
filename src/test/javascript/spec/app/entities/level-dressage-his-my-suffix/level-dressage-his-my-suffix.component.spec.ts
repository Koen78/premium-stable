/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { LevelDressageHisMySuffixComponent } from 'app/entities/level-dressage-his-my-suffix/level-dressage-his-my-suffix.component';
import { LevelDressageHisMySuffixService } from 'app/entities/level-dressage-his-my-suffix/level-dressage-his-my-suffix.service';
import { LevelDressageHisMySuffix } from 'app/shared/model/level-dressage-his-my-suffix.model';

describe('Component Tests', () => {
    describe('LevelDressageHisMySuffix Management Component', () => {
        let comp: LevelDressageHisMySuffixComponent;
        let fixture: ComponentFixture<LevelDressageHisMySuffixComponent>;
        let service: LevelDressageHisMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [LevelDressageHisMySuffixComponent],
                providers: []
            })
                .overrideTemplate(LevelDressageHisMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LevelDressageHisMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LevelDressageHisMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LevelDressageHisMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.levelDressageHis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
