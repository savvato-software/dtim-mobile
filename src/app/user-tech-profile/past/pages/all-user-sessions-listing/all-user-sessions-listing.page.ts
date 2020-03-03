import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../../../../_services/user.service';
import { QuestionService } from '../../../../_services/question.service';
import { LineItemAPIService } from '../../../../_services/line-item-api.service';

import { ModelService } from '../../_services/model.service'

@Component({
  selector: 'app-all-user-sessions-listing',
  templateUrl: './all-user-sessions-listing.page.html',
  styleUrls: ['./all-user-sessions-listing.page.scss'],
})
export class AllUserSessionsListingPage implements OnInit {

	user = undefined;
	userId = undefined;
	questions = undefined;
	lineItemId = undefined;
	levelNumber = undefined;
	lineItem = undefined;
	correctlyAnsweredQuestions = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _userService: UserService,
			    private _questionService: QuestionService,
			    private _lineItemAPIService: LineItemAPIService,
			    private _modelService: ModelService) {

	}

	ngOnInit() {
  		let self = this;

		self._route.params.subscribe((params) => {
			self.lineItemId = params['lineItemId'] * 1;
			self.levelNumber = params['idx'] * 1;
			self.userId = params['userId'] * 1;

			self._modelService._init();

			self._userService.getUserById(self.userId).then((user) => {
				self.user = user;
			})

			self._questionService.getByLineItemAndLevel(self.lineItemId, self.levelNumber).then((questions) => {
				self.questions = questions;
			})

			self._modelService.getAnsweredQuestionsForCell(self.lineItemId, self.levelNumber, self.userId).then((questions) => {
				self.correctlyAnsweredQuestions = questions;
			})

			self._lineItemAPIService.getLineItem(self.lineItemId).then((lineItem) => {
				self.lineItem = lineItem;
			})
		})
	}

	isCorrectlyAnswered(q) {
		return this.correctlyAnsweredQuestions && this.correctlyAnsweredQuestions.find(caq => caq['id'] == q['id']);
	}

	onCorrectAnswerClick(q) {
		this._router.navigate(['/user-tech-profile/' + this.userId + '/past/question-session-grade/' + q.id]);
	}

	onNonCorrectAnswerClick(q) {
		this._router.navigate(['/question-display/' + q.id]);
	}

	getLineItemName() {
		return this.lineItem && this.lineItem['name'];
	}

	getLineItemLevelDescription() {
		return this.lineItem && this.lineItem['l' + this.levelNumber + 'Description'];
	}

	getLineItemLevelNumber() {
		return this.levelNumber;
	}

	getUserName() {
		return this.user && this.user['name'];
	}

	onBackBtnClicked() {
		this._location.back();
	}
}
