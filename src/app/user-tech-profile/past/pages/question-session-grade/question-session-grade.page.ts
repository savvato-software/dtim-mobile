import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../../../../_services/question.service';
import { UserService } from '../../../../_services/user.service';

@Component({
  selector: 'app-question-session-grade',
  templateUrl: './question-session-grade.page.html',
  styleUrls: ['./question-session-grade.page.scss'],
})
export class QuestionSessionGradePage implements OnInit {

    userId = undefined;
    questionId = undefined;
    cqgList = undefined;

    user = undefined;
    question = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
			    private _userService: UserService) {


	}

	ngOnInit() {
	  	let self = this;
		self._route.params.subscribe((params) => {
			self.userId = params['userId'];
			self.questionId = params['questionId'] * 1;

			self._questionService.getUserHistoryForQuestion(self.userId, self.questionId).then((data) => {
				console.log("user history for question " + self.questionId)
				console.log(data)

				self.cqgList = data;
			})

			self._userService.getUserById(self.userId).then((data) => {
				self.user = data;
			})

			self._questionService.getQuestionById(self.questionId).then((data) => {
				self.question = data;
			})
		});
	}

	getUserName() {
		return this.user && this.user["name"];
	}

	getQuestionText() {
		return this.question && this.question["text"];
	}

	onBackBtnClicked() {
		this._location.back();
	}

}
