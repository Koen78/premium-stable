import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEquineSpeciesMySuffix } from 'app/shared/model/equine-species-my-suffix.model';

@Component({
    selector: 'jhi-equine-species-my-suffix-detail',
    templateUrl: './equine-species-my-suffix-detail.component.html'
})
export class EquineSpeciesMySuffixDetailComponent implements OnInit {
    equineSpecies: IEquineSpeciesMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ equineSpecies }) => {
            this.equineSpecies = equineSpecies;
        });
    }

    previousState() {
        window.history.back();
    }
}
