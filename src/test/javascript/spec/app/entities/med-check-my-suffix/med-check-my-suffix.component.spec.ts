/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckMySuffixComponent } from 'app/entities/med-check-my-suffix/med-check-my-suffix.component';
import { MedCheckMySuffixService } from 'app/entities/med-check-my-suffix/med-check-my-suffix.service';
import { MedCheckMySuffix } from 'app/shared/model/med-check-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckMySuffix Management Component', () => {
        let comp: MedCheckMySuffixComponent;
        let fixture: ComponentFixture<MedCheckMySuffixComponent>;
        let service: MedCheckMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckMySuffixComponent],
                providers: []
            })
                .overrideTemplate(MedCheckMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedCheckMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedCheckMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MedCheckMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.medChecks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
