import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../../_services/question.service';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.page.html',
  styleUrls: ['./question-display.page.scss'],
})
export class QuestionDisplayPage implements OnInit {

	questionId = undefined;
	question = undefined;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.questionId = params['questionId'];

			self._questionService.getQuestionById(self.questionId).then((q) => {
				self.question = q[0];
			})
		});
	}

	getQuestionText() {
		return this.question && this.question["text"];
	}

	onEditQuestionBtnClicked() {
		this._router.navigate(['/question-edit/' + this.questionId]);
	}

	onBackBtnClicked() {
		this._location.back();
	}
}
