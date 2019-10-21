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
						getColorMeaningString: () => {
							return "White means there a no questions associated with this skill level. Shades of gray, the closer you get to dark, the more questions, relatively speaking, for that skill level."
						},
						getBackgroundColor: (id, idx) => {
							let count = this._techProfileModelService.getQuestionCountForCell(id, idx);

							// TODO: We want to use a gradient from 0 to #DDDDDD. We need to be able say, there is a range of cell question counts from 0 to MAX.
							//  If a given cell count is N, we need a corresponding color value. So lets just say there are 14 color buckets (#000, #111, ... #DDD),
							//  if MAX is 7, then a cell with 1 question should be #111, a cell with 6 should be #BBB
							//  if MAX is 28, then a cell with 1 questions should be #111, 3 would be #222, 6 would be #333, 28 would be #DDD
							let max = this._techProfileModelService.getHighestQuestionCountForAnyCell();
							max = max * 1.25;

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
