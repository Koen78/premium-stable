import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';
import { EquineSpeciesMySuffixService } from './equine-species-my-suffix.service';

@Component({
    selector: 'jhi-equine-species-my-suffix-update',
    templateUrl: './equine-species-my-suffix-update.component.html'
})
export class EquineSpeciesMySuffixUpdateComponent implements OnInit {
    equineSpecies: IEquineSpeciesMySuffix;
    isSaving: boolean;

    constructor(protected equineSpeciesService: EquineSpeciesMySuffixService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ equineSpecies }) => {
            this.equineSpecies = equineSpecies;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.equineSpecies.id !== undefined) {
            this.subscribeToSaveResponse(this.equineSpeciesService.update(this.equineSpecies));
        } else {
            this.subscribeToSaveResponse(this.equineSpeciesService.create(this.equineSpecies));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEquineSpeciesMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IEquineSpeciesMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
