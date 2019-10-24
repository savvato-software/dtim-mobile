import { Injectable } from '@angular/core';

import { ApiService } from '../../_services/api.service'
import { FunctionPromiseService } from '../../_services/function-promise.service'
import { DomainObjectMetadataService } from 'savvato-javascript-services'
import { environment } from '../../../_environments/environment'

@Injectable({
	providedIn: 'root'
})
export class ModelService {

	GET_ALL_QUESTION_COUNTS_PER_CELL = "getQuestionCountsForAllCells";
	GET_QUESTION_COUNT_OF_A_GIVEN_CELL = "getQuestionCountForAGivenCell";
	GET_MAX_QUESTION_COUNT_FOR_ANY_CELL = "highestQuestionCountForAnyCell";

	constructor(private _apiService: ApiService,
				private _functionPromiseService: FunctionPromiseService,
				private _domainObjectMetadataService: DomainObjectMetadataService) {

	}

	_init() {
		let self;

		this._functionPromiseService.initFunc(this.GET_ALL_QUESTION_COUNTS_PER_CELL, () => {
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
					let rtn = undefined;
					let found = false;
					let passed = false;
					let i = 0;

					while (i < qcpc.length && i <= data['lineItemId'] && !passed && !found) {
						let curr = qcpc[i];

						passed = (curr[0] > data['lineItemId']);
						
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

		this._functionPromiseService.initFunc(this.GET_MAX_QUESTION_COUNT_FOR_ANY_CELL, (data) => {
			return new Promise((resolve, reject) => {
				let qcpc = data['questionCountsPerCell'];

				let max = undefined;
				let i = 0;

				while (qcpc && i < qcpc.length) {
					let curr = qcpc[i];
					if (max === undefined || curr[2] > max) max = curr[2]; 
					i++;
				}

				resolve(max);
			})
		})
	}

	getQuestionCountForCell(id, idx) {
		let self = this;
		let rtn = undefined;

		let qcpc = this._functionPromiseService.get(self.GET_ALL_QUESTION_COUNTS_PER_CELL, self.GET_ALL_QUESTION_COUNTS_PER_CELL, { });

		if (qcpc) {
			let data = {'lineItemId': id, 'lineItemLevelIndex': idx, 'questionCountsPerCell': qcpc};
			rtn = this._functionPromiseService.get(self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL+""+id+"-"+idx, self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL, data)
		}

		return rtn;
	}

	getHighestQuestionCountForAnyCell() {
		let self = this;
		let rtn = undefined;

		let qcpc = this._functionPromiseService.get(self.GET_ALL_QUESTION_COUNTS_PER_CELL, self.GET_ALL_QUESTION_COUNTS_PER_CELL, { });

		if (qcpc) {
			let data = {'questionCountsPerCell': qcpc};
			rtn = this._functionPromiseService.get(self.GET_MAX_QUESTION_COUNT_FOR_ANY_CELL,self.GET_MAX_QUESTION_COUNT_FOR_ANY_CELL, data);
		}

		return rtn;
	}
}
