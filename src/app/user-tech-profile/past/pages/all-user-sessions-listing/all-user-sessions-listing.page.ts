import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../../../../_services/question.service';

import { ModelService } from '../../_services/model.service'

@Component({
  selector: 'app-all-user-sessions-listing',
  templateUrl: './all-user-sessions-listing.page.html',
  styleUrls: ['./all-user-sessions-listing.page.scss'],
})
export class AllUserSessionsListingPage implements OnInit {

	userId = undefined;
	questions = undefined;
	correctlyAnsweredQuestions = undefined;
	lineItemId = undefined;
	levelNumber = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
			    private _modelService: ModelService) {

	}

	ngOnInit() {
  		let self = this;

		self._route.params.subscribe((params) => {
			self.lineItemId = params['lineItemId'] * 1;
			self.levelNumber = params['idx'] * 1;
			self.userId = params['userId'] * 1;

			self._modelService._init();

			self._questionService.getByLineItemAndLevel(self.lineItemId, self.levelNumber).then((questions) => {
				self.questions = questions;
			})

			self._modelService.getAnsweredQuestionsForCell(self.lineItemId, self.levelNumber, self.userId).then((questions) => {
				self.correctlyAnsweredQuestions = questions;
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
}
