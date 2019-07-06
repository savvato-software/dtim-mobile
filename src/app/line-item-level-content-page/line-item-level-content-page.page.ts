import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../_services/question.service'
import { UserTechProfileModelService } from '../_services/user-tech-profile-model.service'

@Component({
  selector: 'app-line-item-level-content-page',
  templateUrl: './line-item-level-content-page.page.html',
  styleUrls: ['./line-item-level-content-page.page.scss'],
})
export class LineItemLevelContentPagePage implements OnInit {

	
	candidateId = undefined;
	lineItemId = undefined;
	lineItem = undefined;
	idx = undefined;
	questions = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
				private _questionService: QuestionService,
				private _userTechProfileModelService: UserTechProfileModelService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.candidateId = params['candidateId'];
			self.lineItemId = params['lineItemId'] * 1;
			self.idx = params['idx'] * 1;
	
			self._questionService.getByLineItemAndLevel(self.lineItemId, self.idx).then((data) => {
				self.questions = data;
			})

			self.lineItem = self._userTechProfileModelService.getTechProfileLineItemById(self.lineItemId);
		});
	}

	areQuestionsAvailable() {
		return this.questions != undefined;
	}

	getQuestions() {
		return this.questions;
	}

	onBackBtnClicked() {
		this._location.back();
	}

	onQuestionClicked(q) {
		this._router.navigate(['/candidate-question-detail/' + this.candidateId + '/' + q.id])
	}

	getLineItemLevel() {
		return this.idx;
	}

	getLineItemShortDescription() {
		return this.lineItem && this.lineItem["l"+this.idx+"Description"].substring(0, 25);
	}

	getLineItem() {
		return this.lineItem || {id: ''};
	}
}
