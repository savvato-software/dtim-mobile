import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { TechProfileModelService } from '../_services/tech-profile-model.service';

@Component({
  selector: 'app-tech-profile-question',
  templateUrl: './tech-profile-question.page.html',
  styleUrls: ['./tech-profile-question.page.scss'],
})
export class TechProfileQuestionPage implements OnInit {

	constructor(private _location: Location,
		    	private _router: Router,
		    	private _route: ActivatedRoute,
				private _techProfileModelService: TechProfileModelService,
		    	) {

	}

	ngOnInit() {

	}

	getParamsPromise = undefined;

	getParams() {
		let self = this;

		if (this.getParamsPromise === undefined) {
			this.getParamsPromise = null;

			this.getParamsPromise = new Promise((resolve, reject) => {
				self._techProfileModelService._init();
				self._techProfileModelService.waitingPromise()
				.then(() => { 
					resolve({
						getModelService: () => {
							return self._techProfileModelService;
						},
						getBackgroundColor: (id, idx) => {
							let count = this._techProfileModelService.getQuestionCountForCell(id, idx);

							if (count == 0)	return "white";
							if (count == 3) return "lightblue";
							else return "yellow";
						},
						onLxDescriptionClick: (id, idx) => {
							this._router.navigate(['/question-list/' + id + '/' + idx]);
						}
					});
				})
			})
		}

		return this.getParamsPromise;
	}

	onNewQuestionBtnClicked(q) {
		this._router.navigate['/question-edit/new'];
	}

	onBackBtnClicked(q) {
		this._location.back();
	}
}
