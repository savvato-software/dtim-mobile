import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '../../_services/function-promise.service';
import { QuestionService } from '../../_services/question.service';
import { TechProfileModelService } from '../../_services/tech-profile-model.service';

import { environment } from '../../../_environments/environment'

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.page.html',
  styleUrls: ['./question-display.page.scss'],
})
export class QuestionDisplayPage implements OnInit {

	questionId = undefined;
	question = undefined;
	lilvassociations = undefined;

	funcKey = "qdpg-controller";

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
			    private _techProfileModelService: TechProfileModelService,
			    private _functionPromiseService: FunctionPromiseService
			    ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.questionId = params['questionId'];

			if (self.questionId) {
				self._questionService.getQuestionById(self.questionId).then((q) => {
					self.question = q;
				});

				self._questionService.getLineItemLevelAssociations(self.questionId).then((data: number[]) => {
					self.lilvassociations = data;
				})

				self._functionPromiseService.initFunc(self.funcKey, () => {
					return new Promise((resolve, reject) => {
						resolve({
							getEnv: () => {
								return environment;
							},
							getColorMeaningString: () => {
								return "lightblue means someone of that skill level should be able to answer this question. To apply this question to more skills, click Edit to edit the question."
							},
							getBackgroundColor: (id, idx) => {
								if (self.getScore(id) === idx) {
									return "lightblue";
								} else {
									return "white";
								}
							},
						})						
					})
				})
			}
		});
	}

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
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

	getScore(lineItemId) {
		let assoc = (this.lilvassociations && this.lilvassociations.find((elem) => { return elem[0] === lineItemId; }));

		return assoc ? assoc[1] : -1;
	}

}
