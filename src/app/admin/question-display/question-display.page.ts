import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../../_services/question.service';
import { TechProfileComponent } from '../../tech-profile/tech-profile.component';

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

			if (self.questionId) {
				self._questionService.getQuestionById(self.questionId).then((q) => {
					self.question = q[0];
				});

				self._questionService.getLineItemLevelAssociations(self.questionId).then((data: number[]) => {
					self.lilvassociations = data;
				})
			}
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

	getScore(lineItemId) {
		let assoc = (this.lilvassociations && this.lilvassociations.find((elem) => { return elem[0] === lineItemId; }));

		return assoc ? assoc[1] : -1;
	}

	getParams() {
		let self = this;
		return {
			getBackgroundColor: (id, idx) => {
				if (self.getScore(id) === idx) {
					return "lightblue";
				} else {
					return "white";
				}
			},
			onLxDescriptionClick: (id, idx) => {
				// do nothing... read only.
			}
		}
	}

}
