import { Injectable } from '@angular/core';

import { ApiService } from '../../../_services/api.service'
import { FunctionPromiseService } from 'savvato-javascript-services'
import { environment } from '../../../../_environments/environment'

@Injectable({
	providedIn: 'root'
})
export class ModelService {

	GET_CORRECT_QUESTION_COUNTS_PER_CELL = "getCorrectQuestionCountsPerCell";
	GET_TOTAL_QUESTION_COUNTS_PER_CELL = "getTotalQuestionCountsPerCell";
	GET_QUESTION_COUNT_OF_A_GIVEN_CELL = "getQuestionCountForAGivenCell";
	GET_TOTAL_QUESTION_COUNT_FOR_CELL = "totalQuestionCountForCell";

	constructor(private _apiService: ApiService,
				private _functionPromiseService: FunctionPromiseService) {

	}

	_init() {
		let self;

		this._functionPromiseService.reset(this.GET_CORRECT_QUESTION_COUNTS_PER_CELL);
		this._functionPromiseService.initFunc(this.GET_CORRECT_QUESTION_COUNTS_PER_CELL, (data) => {
			return new Promise((resolve, reject) => {
				let url = environment.apiUrl + "/api/techprofile/user/" + data['userId'] + "/correctlyAnsweredQuestionCountsPerCell";
				this._apiService.get(url)
				.subscribe((qcpc) => {
					resolve(qcpc);
				}, (err) => {
					reject(err);
				})
			})
		});

		this._functionPromiseService.reset(this.GET_TOTAL_QUESTION_COUNTS_PER_CELL);
		this._functionPromiseService.initFunc(this.GET_TOTAL_QUESTION_COUNTS_PER_CELL, (data) => {
			return new Promise((resolve, reject) => {
				let url = environment.apiUrl + "/api/techprofile/questionCountsPerCell";
				this._apiService.get(url)
				.subscribe((qcpc) => {
					resolve(qcpc);
				}, (err) => {
					reject(err);
				})
			})
		});

		this._functionPromiseService.initFunc(this.GET_QUESTION_COUNT_OF_A_GIVEN_CELL, (data) => {
			return new Promise((resolve, reject) => {
				let qcpc = data['questionCountsPerCell'];

				if (!qcpc) 
					throw new Error("questionCountsPerCell needed.");
				else {
					let rtn = 0;
					let found = false;
					let passed = false;
					let i = 0;

					while (i < qcpc.length && !passed && !found) {
						let curr = qcpc[i];

						passed = (curr[0] > data['lineItemId']); // have we passed the point we are looking for?

						if (!passed) {
							if (data['lineItemId'] == curr[0] && data['lineItemLevelIndex'] == curr[1]) {
								rtn = curr[2];
								found = true;
							}
						}

						i++;
					}

					resolve(rtn);
				}
			})
		})
	}

	getAnsweredQuestionCountForCell(id, idx, userId) {
		let self = this;
		let rtn = undefined;

		let qcpc = this._functionPromiseService.get(self.GET_CORRECT_QUESTION_COUNTS_PER_CELL, self.GET_CORRECT_QUESTION_COUNTS_PER_CELL, {"userId": userId});

		if (qcpc) {
			let data = {'lineItemId': id, 'lineItemLevelIndex': idx, 'questionCountsPerCell': qcpc};
			rtn = this._functionPromiseService.get(self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL+"-correct"+id+"-"+idx+"/"+qcpc.length, self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL, data)
		}
		
		return rtn;
	}

	getQuestionCountForCell(id, idx, userId) {
		let self = this;
		let rtn = undefined;

		let qcpc = this._functionPromiseService.get(self.GET_TOTAL_QUESTION_COUNTS_PER_CELL, self.GET_TOTAL_QUESTION_COUNTS_PER_CELL, { });

		if (qcpc) {
			let data = {'lineItemId': id, 'lineItemLevelIndex': idx, 'questionCountsPerCell': qcpc};
			rtn = this._functionPromiseService.get(self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL+"-total-"+id+"-"+idx+"/"+qcpc.length, self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL, data)
		}

		return rtn;
	}
}
