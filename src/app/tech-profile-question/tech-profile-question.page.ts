import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { MenuController } from '@ionic/angular';

import { ModelService } from './_services/model.service';
import { FunctionPromiseService } from 'savvato-javascript-services'

import { environment } from '../../_environments/environment';

@Component({
  selector: 'app-tech-profile-question',
  templateUrl: './tech-profile-question.page.html',
  styleUrls: ['./tech-profile-question.page.scss'],
})
export class TechProfileQuestionPage implements OnInit {

	funcKey = "tpqp-controller";

	constructor(private _location: Location,
		    	private _router: Router,
		    	private _route: ActivatedRoute,
				private _modelService: ModelService,
				private _functionPromiseService: FunctionPromiseService,
				private _menuCtrl: MenuController
		    	) {

	}

	ngAfterContentChecked() {
		this._functionPromiseService.get("TPQP-ResetModel", "TPQP-ResetModel", { freshnessLengthInMillis: 3000 });
	}

	ngOnInit() {
		let self = this;

		self._modelService._init();

		self._functionPromiseService.reset("currentMenuOptions");
		self._functionPromiseService.initFunc("currentMenuOptions", () => {
			return new Promise((resolve, reject) => { 
				resolve([{
			        title: 'Home',
			        url: '/home',
			        icon: 'home'
			      },
			      {
			        title: 'End',
			        url: '/end',
			        icon: 'down'
			      }
			    ]);
			});
		})

		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					getEnv: () => {
						return environment;
					},
					getColorMeaningString: () => {
						return "Select a skill and level for this new question. White means there are no questions associated with this skill level. Shades of gray, the closer you get to dark, indicate the more questions, relatively speaking, for that skill level."
					},
					getBackgroundColor: (lineItem, idx) => {

						let count = this._modelService.getQuestionCountForCell(lineItem['id'], idx);
						let max = this._modelService.getHighestQuestionCountForAnyCell();

						let shadesOfGray = ["#E0E0E0","#D0D0D0","#C0C0C0","#B0B0B0","#A0A0A0","#909090","#808080","#707070","#606060", "#505050"]

						if (count && max) {
							let p = this._modelService.getPercentileForTheNumberOfQuestionsForThisCell(lineItem['id'], idx);
							let rtn = undefined;

							rtn = shadesOfGray[Math.max(p - 1, 0)];

							// console.log("### controller getBackgroundColor()", lineItem['id'], idx, count, max, p, rtn);

							return rtn;
						}

						return "white";
					},
					onLxDescriptionClick: (lineItem, idx) => {
						// this._router.navigate(['/question-list/' + lineItem['id'] + '/' + idx]);
						self._menuCtrl.open("main").then((b) => {

						})
					}
				});
			});
		})

		self._functionPromiseService.initFunc("TPQP-ResetModel", () => {
			return new Promise((resolve, reject) => {
				self._modelService._init();
				resolve();
			})
		})

	}

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { })
	}

	onNewQuestionBtnClicked(q) {
		this._router.navigate['/question-edit/new'];
	}

	onBackBtnClicked(q) {
		this._location.back();
	}
}
