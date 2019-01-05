/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckDetMySuffixComponent } from 'app/entities/med-check-det-my-suffix/med-check-det-my-suffix.component';
import { MedCheckDetMySuffixService } from 'app/entities/med-check-det-my-suffix/med-check-det-my-suffix.service';
import { MedCheckDetMySuffix } from 'app/shared/model/med-check-det-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckDetMySuffix Management Component', () => {
        let comp: MedCheckDetMySuffixComponent;
        let fixture: ComponentFixture<MedCheckDetMySuffixComponent>;
        let service: MedCheckDetMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckDetMySuffixComponent],
                providers: []
            })
                .overrideTemplate(MedCheckDetMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedCheckDetMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedCheckDetMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MedCheckDetMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.medCheckDets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
