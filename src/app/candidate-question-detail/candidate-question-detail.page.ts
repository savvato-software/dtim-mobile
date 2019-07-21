import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AttendanceModelService } from '../_services/attendance-model.service';
import { QuestionService } from '../_services/question.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-candidate-question-detail',
  templateUrl: './candidate-question-detail.page.html',
  styleUrls: ['./candidate-question-detail.page.scss'],
})
export class CandidateQuestionDetailPage implements OnInit {

	dirty = false;
	candidateId = undefined;
	candidate = undefined;
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
			self.candidateId = params['candidateId'];
			self.questionId = params['questionId'] * 1;

			self._questionService.getCandidateHistoryForQuestion(self.candidateId, self.questionId).then((data) => {
				console.log("candidate history for question " + self.questionId)
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


			self._userService.getCandidateById(self.candidateId).then((data) => {
				self.candidate = data;
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

	getCandidateName() {
		return this.candidate && this.candidate["name"];
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

	getCandidateHasHistoryForQuestion() {
		return !!this.cqgList;
	}

	getCandidateHistoryForQuestion() {
		return this.cqgList;
	}

	onBackBtnClicked() {
		let self = this;
		console.log("current sesison score: " + self.currentSessionScore);

		if (self.isDirty()) {
			let obj = {score: self.currentSessionScore, comment: self.currentSessionComment};

			self._questionService.setSessionScore(self.candidateId, self.questionId, self.getCurrentSessionNumber(), obj).then(() =>{
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
