/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { EquineSpeciesMySuffixComponent } from 'app/entities/equine-species-my-suffix/equine-species-my-suffix.component';
import { EquineSpeciesMySuffixService } from 'app/entities/equine-species-my-suffix/equine-species-my-suffix.service';
import { EquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';

describe('Component Tests', () => {
    describe('EquineSpeciesMySuffix Management Component', () => {
        let comp: EquineSpeciesMySuffixComponent;
        let fixture: ComponentFixture<EquineSpeciesMySuffixComponent>;
        let service: EquineSpeciesMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [EquineSpeciesMySuffixComponent],
                providers: []
            })
                .overrideTemplate(EquineSpeciesMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EquineSpeciesMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquineSpeciesMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EquineSpeciesMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.equineSpecies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
