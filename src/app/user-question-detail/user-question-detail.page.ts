import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AttendanceModelService } from '../_services/attendance-model.service';
import { QuestionService } from '../_services/question.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-question-detail',
  templateUrl: './user-question-detail.page.html',
  styleUrls: ['./user-question-detail.page.scss'],
})
export class UserQuestionDetailPage implements OnInit {

	dirty = false;
	userId = undefined;
	user = undefined;
	question = undefined;
	questionId = undefined;
	currentSessionScore = undefined;
	currentSessionComment = undefined;

	cqgList = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
			    private _userService: UserService,
			    private _attendanceModelService: AttendanceModelService) {

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
				
				let sessionNumber = self.getCurrentSessionNumber();

				self.cqgList.forEach((score) => {
					if (score["sessionId"] === sessionNumber) {
						self.currentSessionScore = ''+score["grade"];
						self.currentSessionComment = score["comment"];
					}
				})
			})


			self._userService.getUserById(self.userId).then((data) => {
				self.user = data;
			})

			self._questionService.getQuestionById(self.questionId).then((data) => {
				self.question = data;
			})
		});

	}

	isDirty() {
		return this.dirty;
	}

	setDirty() {
		this.dirty = true;
	}

	getUserName() {
		return this.user && this.user["name"];
	}

	getQuestionText() {
		return this.question && this.question["text"];
	}

	getQuestionId() {
		return this.questionId;
	}

	isSessionActive() {
		return !!this.getCurrentSessionNumber()
	}

	getCurrentSessionQuestionComment() {
		return this.currentSessionComment;
	}

	getCurrentSessionNumber() {
		return this._attendanceModelService.getCurrentSessionNumber();
	}

	getUserHasHistoryForQuestion() {
		return !!this.cqgList;
	}

	getUserHistoryForQuestion() {
		return this.cqgList;
	}

	onBackBtnClicked() {
		let self = this;
		console.log("current sesison score: " + self.currentSessionScore);

		if (self.isDirty()) {
			let obj = {score: self.currentSessionScore, comment: self.currentSessionComment};

			self._questionService.setSessionScore(self.userId, self.questionId, self.getCurrentSessionNumber(), obj).then(() =>{
				self._location.back();
			});
		} else {
			self._location.back();
		}
	}

	cqgObjectIsForCurrentSession(cqg) {
		let currentSessionNumber = this.getCurrentSessionNumber();
		let rtn = false;

		if (currentSessionNumber) {
			rtn = (cqg["sessionId"] === currentSessionNumber);
		}

		return rtn;
	}

	onSomethingChanged($evt) {
		this.setDirty();
	}
}
