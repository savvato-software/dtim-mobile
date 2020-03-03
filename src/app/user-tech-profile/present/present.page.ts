import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../../_services/alert.service';
import { AttendanceModelService } from '../../_services/attendance-model.service';
import { FunctionPromiseService } from 'savvato-javascript-services'
import { CareerGoalService } from '../../_services/career-goal.service';
import { TechProfileAPIService } from '../../_services/tech-profile-api.service';
import { UserTechProfileModelService } from '../../_services/user-tech-profile-model.service';
import { UserService } from '../../_services/user.service';

import { TechProfileModelService } from '../../_services/tech-profile-model.service';

import { ModelService } from './_services/model.service'

import { environment } from '../../../_environments/environment';

import * as jsonpath from 'jsonpath'

@Component({
  selector: 'app-user-tech-profile-present',
  templateUrl: './present.page.html',
  styleUrls: ['./present.page.scss'],
})
export class PresentUserTechProfilePage implements OnInit {

  	userId = undefined;
  	user = undefined;
  	careerGoal = undefined;
  	questions = undefined;
  	alreadyAskedQuestions = undefined;

  	funcKey = "present-utp-controller";

	constructor(private _location: Location,
		    private _router: Router,
		    private _route: ActivatedRoute,
		    private _modelService: ModelService,
		    private _functionPromiseService: FunctionPromiseService,
		    private _careerGoalService: CareerGoalService,
		    private _attendanceModelService: AttendanceModelService,
		    private _techProfileModelService: TechProfileModelService,
			private _userTechProfileModel: UserTechProfileModelService,
		    private _userService: UserService,
		    private _alertService: AlertService ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.userId = params['userId'] * 1;
			console.log("userId ==> " + self.userId);

			self._userTechProfileModel.init(self.userId);

			self._userService.getUserById(self.userId).then((data) => {
				self.user = data;
			})

			// WILO...
			// First create a present view that is just a list of questions. You can tap on a question, be taken to its grading page for this user in this session.questions
			// Then a tech profile view.. you tap the cell, and if there is a single question in the cell, you are taken to the grading page. If there are multiple recommended questions in the cell, you are taken to the list of questions, same as the list of questions view described above. If there are no questions in the cell, tapping it does nothing.

			self._careerGoalService.getCareerGoalForUserId(self.userId).then((careerGoal) => {
				self._careerGoalService.getNextQuestionsForCareerGoal(self.userId, careerGoal['id']).then((questions: []) => {
					self.questions = questions;

					self._modelService.getPathsForCareerGoalQuestions(careerGoal, questions);
				})

				let csn = self._attendanceModelService.getCurrentSessionNumber();

				if (csn) {
					self._careerGoalService.getQuestionsAlreadyAskedInThisSession(self.userId, csn).then((questions) => {
						self.alreadyAskedQuestions = questions;
					})
				}

				self.careerGoal = careerGoal;
			})

		})
	}

	getUserName() {
		return this.user && this.user['name']
	}

	getChosenCareerGoalName() {
		return this.careerGoal && this.careerGoal['name'];
	}

	getCareerGoalPaths() {
		if (this.careerGoal && this.questions) {
			let paths = this._modelService.getPathsForCareerGoalQuestions(this.careerGoal, this.questions);

			let rtn = [];

			let indexes = paths.map(p => p[2]);
			indexes = indexes.filter((item, index) => indexes.indexOf(item) === index); // remove dupes

			indexes.forEach(pi => rtn.push(jsonpath.query(this.careerGoal, "$..paths[" + pi + "]")))

			if (rtn.length === 1) return rtn;
			else return rtn.sort((a, b) => { 
				return a['name'].localeCompare(b['name'])
			});
		}
	}

	getMilestones(path) {
		if (this.careerGoal && this.questions) {
			let paths = this._modelService.getPathsForCareerGoalQuestions(this.careerGoal, this.questions);

			let rtn = [];

			let indexes = paths.map(p => p[4]);
			indexes = indexes.filter((item, index) => indexes.indexOf(item) === index); // remove dupes

			indexes.forEach(pi => rtn.push(jsonpath.query(this.careerGoal, "$..milestones[" + pi + "]")[0]))

			if (rtn.length === 1) return rtn;
			else return rtn.sort((a, b) => { 
				return a['name'].localeCompare(b['name'])
			});
		}
	}

	getLabours(milestone) {
		if (this.careerGoal && this.questions) {
			let paths = this._modelService.getPathsForCareerGoalQuestions(this.careerGoal, this.questions);

			let rtn = [];

			for (var i=0; i<paths.length; i++) {
				let func = (p, milestone) => {
					let cg = jsonpath.query(this.careerGoal, p[0])[0];
					let pp = jsonpath.query(cg, p[1]+'['+p[2]+']')[0]
					let ms = jsonpath.query(pp, p[3]+'['+p[4]+']')[0]
					
					if (ms['id'] === milestone['id'])
						rtn.push(jsonpath.query(ms, p[5]+'['+p[6]+']'))
				};

				func(paths[i], milestone);
			}

			if (rtn.length === 1) return rtn;
			else return rtn.sort((a, b) => { 
				return a[0]['name'].localeCompare(b[0]['name'])
			});
		}
	}

	getLabourName(labour) {
		return labour['name']
	}

	getMilestoneName(milestone)	{
		return milestone['name']
	}

	getNextQuestions(labour) {
		return labour["questions"].filter(q => this.questions.map(m => m.id).includes(q.id)) // return all the questions in this labor that also appear in the next-questions object
	}

	thereAreQuestionsAskedInThisSession() {
		return this.alreadyAskedQuestions !== undefined;
	}

	getQuestionsAlreadyAskedInThisSession() {
		return this.alreadyAskedQuestions;
	}

	getCurrentSessionNumber() {
		return this._attendanceModelService.getCurrentSessionNumber();
	}

	onQuestionClicked(q) {
		this._router.navigate(['user-question-detail/' + this.userId + '/' + q.id ]);
	}

	onBackBtnClicked() {
		this._userTechProfileModel.save().then(() => {
			this._location.back();
		});
	}
}
