/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PremiumStableTestModule } from '../../../test.module';
import { PictureMySuffixUpdateComponent } from 'app/entities/picture-my-suffix/picture-my-suffix-update.component';
import { PictureMySuffixService } from 'app/entities/picture-my-suffix/picture-my-suffix.service';
import { PictureMySuffix } from 'app/shared/model/picture-my-suffix.model';

describe('Component Tests', () => {
    describe('PictureMySuffix Management Update Component', () => {
        let comp: PictureMySuffixUpdateComponent;
        let fixture: ComponentFixture<PictureMySuffixUpdateComponent>;
        let service: PictureMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PremiumStableTestModule],
                declarations: [PictureMySuffixUpdateComponent]
            })
                .overrideTemplate(PictureMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PictureMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PictureMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PictureMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.picture = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PictureMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.picture = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
