import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../_services/question.service';

@Component({
  selector: 'app-candidate-question-detail',
  templateUrl: './candidate-question-detail.page.html',
  styleUrls: ['./candidate-question-detail.page.scss'],
})
export class CandidateQuestionDetailPage implements OnInit {

	candidateId = undefined;
	questionId = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.candidateId = params['candidateId'];
			self.questionId = params['questionId'] * 1;

			self._questionService.getCandidateHistoryForQuestion(self.candidateId, self.questionId).then((data) => {
			
			})
		});

	}

	getCandidateId() {
		return this.candidateId;
	}

	getQuestionId() {
		return this.questionId;
	}
}
