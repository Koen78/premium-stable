/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { MedCheckXrayMySuffixComponent } from 'app/entities/med-check-xray-my-suffix/med-check-xray-my-suffix.component';
import { MedCheckXrayMySuffixService } from 'app/entities/med-check-xray-my-suffix/med-check-xray-my-suffix.service';
import { MedCheckXrayMySuffix } from 'app/shared/model/med-check-xray-my-suffix.model';

describe('Component Tests', () => {
    describe('MedCheckXrayMySuffix Management Component', () => {
        let comp: MedCheckXrayMySuffixComponent;
        let fixture: ComponentFixture<MedCheckXrayMySuffixComponent>;
        let service: MedCheckXrayMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [MedCheckXrayMySuffixComponent],
                providers: []
            })
                .overrideTemplate(MedCheckXrayMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedCheckXrayMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedCheckXrayMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MedCheckXrayMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.medCheckXrays[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
