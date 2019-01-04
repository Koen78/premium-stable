import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonMySuffix } from 'app/shared/model/person-my-suffix.model';

@Component({
    selector: 'jhi-person-my-suffix-detail',
    templateUrl: './person-my-suffix-detail.component.html'
})
export class PersonMySuffixDetailComponent implements OnInit {
    person: IPersonMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ person }) => {
            this.person = person;
        });
    }

    previousState() {
        window.history.back();
    }
}
