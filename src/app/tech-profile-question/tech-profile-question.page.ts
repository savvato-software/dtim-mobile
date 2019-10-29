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
						return "Select a skill and level for this new question. White means there are no questions associated with this skill level. Shades of gray, the closer you get to dark, indicate the more questions, relatively speaking, for that skill level."
					},
					getBackgroundColor: (lineItem, idx) => {
							let count = this._modelService.getQuestionCountForCell(lineItem['id'], idx);
							let max = this._modelService.getHighestQuestionCountForAnyCell();

							let shadesOfGray = ["#FFFFFF","#E0E0E0","#D0D0D0","#C0C0C0","#B0B0B0","#A0A0A0","#909090","#808080","#707070","#606060"]

							if (count && max) {
								let p = this._modelService.getPercentileForTheNumberOfQuestionsForThisCell(lineItem['id'], idx);
								let rtn = undefined;

								if (p) {
									rtn = shadesOfGray[p - 1];
								}

								return rtn;
							}

							return "white";
					},
					onLxDescriptionClick: (lineItem, idx) => {
						this._router.navigate(['/question-list/' + lineItem['id'] + '/' + idx]);
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
