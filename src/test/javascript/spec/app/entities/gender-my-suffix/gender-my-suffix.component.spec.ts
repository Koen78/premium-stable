/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { GenderMySuffixComponent } from 'app/entities/gender-my-suffix/gender-my-suffix.component';
import { GenderMySuffixService } from 'app/entities/gender-my-suffix/gender-my-suffix.service';
import { GenderMySuffix } from 'app/shared/model/gender-my-suffix.model';

describe('Component Tests', () => {
    describe('GenderMySuffix Management Component', () => {
        let comp: GenderMySuffixComponent;
        let fixture: ComponentFixture<GenderMySuffixComponent>;
        let service: GenderMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [GenderMySuffixComponent],
                providers: []
            })
                .overrideTemplate(GenderMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GenderMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenderMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GenderMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.genders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
