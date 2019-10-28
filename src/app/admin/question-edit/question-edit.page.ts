import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from 'savvato-javascript-services'
import { QuestionService } from '../../_services/question.service';
import { AlertService } from '../../_services/alert.service';
import { TechProfileModelService } from '../../_services/tech-profile-model.service';

import { QuestionEditService } from '../_services/question-edit.service';

import { environment } from '../../../_environments/environment'

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.page.html',
  styleUrls: ['./question-edit.page.scss'],
})
export class QuestionEditPage implements OnInit {

	dirty = false;
	questionId = undefined;
	question = undefined;
	lilvassociations = undefined;
	isNew = true;

	funcKey = "qepg-getParams1";

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
			    private _questionEditService: QuestionEditService,
    			private _alertService: AlertService,
			    private _techProfileModelService: TechProfileModelService,
			    private _functionPromiseService: FunctionPromiseService) {

	}

	ngOnInit() {
		let self = this;

		self._techProfileModelService._init();

		self._route.params.subscribe((params) => {
			self.questionId = params['questionId'];

			self.question = {id: -1, text: ''};
			self.lilvassociations = []

			let tmp = self._questionEditService.getSetupFunc()();
			if (tmp) {
				self.lilvassociations.push([tmp['lineItemId'], tmp['levelNumber']]);
			}

			if (self.questionId) {
				self._questionService.getQuestionById(self.questionId).then((q) => {
					self.question = q;
					self.isNew = false;
				});

				self._questionService.getLineItemLevelAssociations(self.questionId).then((data: number[]) => {
					self.lilvassociations = data;
				})
			}

			self._functionPromiseService.initFunc(self.funcKey, () => {
				return new Promise((resolve, reject) => {
					resolve({
						getEnv: () => {
							return environment;
						},
						getColorMeaningString: () => {
							return "lightblue means someone of that skill level should be able to answer this question. Click on a cell to apply this question to that skill. Click again to clear it."
						},
						getBackgroundColor: (lineItem, idx) => {
							if (self.getScore(lineItem['id']) === idx) {
								return "lightblue";
							} else {
								return "white";
							}
						},
						onLxDescriptionClick: (lineItem, idx) => {
							let association = self.lilvassociations.find((element) => { return element[0] === lineItem['id']; });

							if (association) {
								if (idx === association[1]) {
									// remove the association
									let l = self.lilvassociations.filter((element) => { return element[0] !== lineItem['id']; });
									self.lilvassociations = l;
								} else {
									// update the association
									association[1] = idx
								}
							} else {
								// add a new association
								self.lilvassociations.push([lineItem['id'], idx]);
							}

							self.setDirty();
						}
					})
				})
			})
		});
	}

	isDirty() {
		return this.dirty;
	}

	setDirty() {
		this.dirty = true;
	}

	getQuestionText() {
		return this.question && this.question["text"];
	}

	onQuestionChange(evt) {
		this.question["text"] = evt.currentTarget.value;
		this.setDirty();
	}

	isSaveBtnAvailable() {
		return this.isDirty() && this.question && this.question['text'] && this.lilvassociations && this.lilvassociations.length > 0
	}

	onSaveBtnClicked() {
		if (this.isDirty() && this.question && this.lilvassociations) {
			this._questionService.save(this.question, this.lilvassociations).then(() => {
				this._location.back();
			});
		} else {
			this._location.back();
		}
	}

	onCancelBtnClicked() {
		let self = this;
		if (this.question['text'] && this.question['text'].length > 0 && this.isDirty()) {
			self._alertService.show({
				header: 'Save Changes?',
				message: "You made changes. Save 'em?",
				buttons: [
					{
						text: 'No', role: 'cancel', handler: () => {
							this._location.back();
						}
					}, {
						text: 'Yes', handler: () => {
							self.onSaveBtnClicked();
						}
					}
				]
			})

		} else {
			this._location.back();
		}
	}

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey,  { })
	}

	getScore(lineItemId) {
		let assoc = (this.lilvassociations && this.lilvassociations.find((elem) => { return elem[0] === lineItemId; }));

		return assoc ? assoc[1] : -1;
	}

}
