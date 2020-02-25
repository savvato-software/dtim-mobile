import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { ModelService } from './_services/model.service';
import { QuestionEditService } from '../_services/question-edit.service';
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
				private _alertService: AlertService,
				private _questionEditService: QuestionEditService,
				private _functionPromiseService: FunctionPromiseService
		    	) {

	}

	ionViewWillEnter() {
		this._modelService._init();
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
						return "Select a skill and level for this new question. Cells are colored such that, the closer you get to dark, the more questions, relatively speaking, are defined at that skill level."
					},
					getBackgroundColor: (lineItem, idx) => {

						let count = this._modelService.getQuestionCountForCell(lineItem['id'], idx);
						let max = this._modelService.getHighestQuestionCountForAnyCell();

						let shadesOfGray = ["#E0E0E0","#D0D0D0","#C0C0C0","#B0B0B0","#A0A0A0","#909090","#808080","#707070","#606060", "#505050"]

						if (count && max) {
							let p = this._modelService.getPercentileForTheNumberOfQuestionsForThisCell(lineItem['id'], idx);
							let rtn = undefined;

							rtn = shadesOfGray[Math.max(p - 1, 0)];

							return rtn;
						}

						return "white";
					},
					onLxDescriptionClick: (lineItem, idx) => {
						let count = this._modelService.getQuestionCountForCell(lineItem['id'], idx);
						console.log(lineItem['id'], idx, " clicked on. count --> ", count)						
						if (count === 0) {

							self._alertService.show({
								header: 'New Question?',
								message: "Do you want to create a new question here?",
								buttons: [
								{
								    text: 'New Question', handler: () => {
										self._questionEditService.reset();
										self._questionEditService.setSetupFunc(
											// this returns an array of lineItemLevels, one for each that this question has selected
											//   ..and since this is a new question, the result of clicking on a single cell,
											//   ....there is only one lineItemLevel in the array
											() => { 
												return [ {lineItemId: lineItem['id'], levelNumber: idx} ];
											}
										);

										self._router.navigate(['/question-edit/new']);
								    }
								},
								  {
								    text: 'Cancel', role: 'cancel', handler: () => {
								      // do nothing
								    }
								  }								
								]
							})

						} else if (count > 0) {
							this._router.navigate(['/question-list/' + lineItem['id'] + '/' + idx]);
						}
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

	onBackBtnClicked() {
		this._location.back();
	}
}
