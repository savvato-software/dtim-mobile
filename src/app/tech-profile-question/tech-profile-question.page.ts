import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tech-profile-question',
  templateUrl: './tech-profile-question.page.html',
  styleUrls: ['./tech-profile-question.page.scss'],
})
export class TechProfileQuestionPage implements OnInit {

	constructor(private _location: Location,
		    	private _router: Router,
		    	private _route: ActivatedRoute) {

	}

	ngOnInit() {

	}

	getParams() {
		let self = this;

		return {
			getBackgroundColor: (id, idx) => {
				return "white";
			},
			onLxDescriptionClick: (id, idx) => {
				console.log("clicked!!!!FDSaf " + id + " " + idx)
				this._router.navigate(['/question-list/' + id + '/' + idx]);
			},
			getTopicBackgroundColor: (thisId) => {

			},
			onTopicClick: (thisId) => {

			},
			getLineItemBackgroundColor: (thisId) => {

			},
			onLineItemClick: (thisId) => {

			}
		};
	}

	onNewQuestionBtnClicked(q) {
		this._router.navigate['/question-edit/new'];
	}

	onBackBtnClicked(q) {
		this._location.back();
	}
}
