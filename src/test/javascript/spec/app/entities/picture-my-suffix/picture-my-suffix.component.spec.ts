/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PremiumStableTestModule } from '../../../test.module';
import { PictureMySuffixComponent } from 'app/entities/picture-my-suffix/picture-my-suffix.component';
import { PictureMySuffixService } from 'app/entities/picture-my-suffix/picture-my-suffix.service';
import { PictureMySuffix } from 'app/shared/model/picture-my-suffix.model';

describe('Component Tests', () => {
    describe('PictureMySuffix Management Component', () => {
        let comp: PictureMySuffixComponent;
        let fixture: ComponentFixture<PictureMySuffixComponent>;
        let service: PictureMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [PictureMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PictureMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PictureMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PictureMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PictureMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pictures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
