import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../../_services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnInit {

  questions = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService) {

  }

  ngOnInit() {
	let self = this;

	self._questionService.getAll().then((allQuestions) => {
		self.questions = allQuestions;
	})
  }

	getAllQuestions() {
		return this.questions;
	}  

	onDisplayQuestionBtnClicked(q) {
		this._router.navigate(['/question-display/' + q.id]);
	}

	onNewQuestionBtnClicked(q) {
		this._router.navigate['/question-edit/new'];
	}

	onBackBtnClicked(q) {
		this._location.back();
	}
}
