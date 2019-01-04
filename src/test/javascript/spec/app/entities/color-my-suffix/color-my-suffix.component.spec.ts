/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { ColorMySuffixComponent } from 'app/entities/color-my-suffix/color-my-suffix.component';
import { ColorMySuffixService } from 'app/entities/color-my-suffix/color-my-suffix.service';
import { ColorMySuffix } from 'app/shared/model/color-my-suffix.model';

describe('Component Tests', () => {
    describe('ColorMySuffix Management Component', () => {
        let comp: ColorMySuffixComponent;
        let fixture: ComponentFixture<ColorMySuffixComponent>;
        let service: ColorMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [ColorMySuffixComponent],
                providers: []
            })
                .overrideTemplate(ColorMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ColorMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColorMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ColorMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.colors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
