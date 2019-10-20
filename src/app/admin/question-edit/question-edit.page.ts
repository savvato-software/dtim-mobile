import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../../_services/question.service';
import { AlertService } from '../../_services/alert.service';
import { TechProfileModelService } from '../../_services/tech-profile-model.service';

import { QuestionEditService } from '../_services/question-edit.service';

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

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
			    private _questionEditService: QuestionEditService,
    			private _alertService: AlertService,
			    private _techProfileModelService: TechProfileModelService) {

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

	getScore(lineItemId) {
		let assoc = (this.lilvassociations && this.lilvassociations.find((elem) => { return elem[0] === lineItemId; }));

		return assoc ? assoc[1] : -1;
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
							if (self.getScore(id) === idx) {
								return "lightblue";
							} else {
								return "white";
							}
						},
						onLxDescriptionClick: (id, idx) => {
							// TODO think we could do better than O(2n)?
							let association = self.lilvassociations.find((element) => { return element[0] === id; });

							if (association) {
								if (idx === association[1]) {
									// remove the association
									let l = self.lilvassociations.filter((element) => { return element[0] !== id; });
									self.lilvassociations = l;
								} else {
									// update the association
									association[1] = idx
								}
							} else {
								// add a new association
								self.lilvassociations.push([id, idx]);
							}

							self.setDirty();
						}
					})
				})
			});
		};

		return this.getParamsPromise;
	}
}
