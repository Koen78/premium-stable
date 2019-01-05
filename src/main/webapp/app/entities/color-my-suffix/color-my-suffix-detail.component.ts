import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColorMySuffix } from 'app/shared/model/color-my-suffix.model';

@Component({
    selector: 'jhi-color-my-suffix-detail',
    templateUrl: './color-my-suffix-detail.component.html'
})
export class ColorMySuffixDetailComponent implements OnInit {
    color: IColorMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ color }) => {
            this.color = color;
        });
    }

    previousState() {
        window.history.back();
    }
}
