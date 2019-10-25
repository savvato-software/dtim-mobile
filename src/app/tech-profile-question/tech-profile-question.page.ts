import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ModelService } from './_services/model.service';
import { FunctionPromiseService } from 'savvato-javascript-services'

import { environment } from '../../_environments/environment';

@Component({
  selector: 'app-tech-profile-question',
  templateUrl: './tech-profile-question.page.html',
  styleUrls: ['./tech-profile-question.page.scss'],
})
export class TechProfileQuestionPage implements OnInit {

	funcKey = "tpqp-controller";

	constructor(private _location: Location,
		    	private _router: Router,
		    	private _route: ActivatedRoute,
				private _modelService: ModelService,
				private _functionPromiseService: FunctionPromiseService
		    	) {

	}

	ngOnInit() {
		let self = this;

		self._modelService._init();

		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					getEnv: () => {
						return environment;
					},
					getColorMeaningString: () => {
						return "White means there a no questions associated with this skill level. Shades of gray, the closer you get to dark, the more questions, relatively speaking, for that skill level."
					},
					getBackgroundColor: (id, idx) => {
							// TODO: We want to use a gradient from 0 to #DDDDDD. We need to be able say, there is a range of cell question counts from 0 to MAX.
							//  If a given cell count is N, we need a corresponding color value. So lets just say there are 14 color buckets (#000, #111, ... #DDD),
							//  if MAX is 7, then a cell with 1 question should be #111, a cell with 6 should be #BBB
							//  if MAX is 28, then a cell with 1 questions should be #111, 3 would be #222, 6 would be #333, 28 would be #DDD
							let count = this._modelService.getQuestionCountForCell(id, idx);
							let max = this._modelService.getHighestQuestionCountForAnyCell();

							if (max) {
								max = max * 1.25;

								if (count == undefined)	return "white";
								if (count == 3) return "lightblue";
								else return "yellow";
							}
					},
					onLxDescriptionClick: (id, idx) => {
						this._router.navigate(['/question-list/' + id + '/' + idx]);
					}
				});
			});
		})

	}

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { })
	}

	onNewQuestionBtnClicked(q) {
		this._router.navigate['/question-edit/new'];
	}

	onBackBtnClicked(q) {
		this._location.back();
	}
}
