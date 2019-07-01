import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

	constructor(private _apiService: ApiService) {

	}

	getByLineItemAndLevel(lineItemId, levelIdx) {
  		let url = environment.apiUrl + "/api/question/" + lineItemId + "/" + levelIdx;

  		let rtn = new Promise(
  			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data) => {
						resolve(data);
					}, (err) => {
						reject(err);
					});
  			}
  		);

  		return rtn;
	}

	getCandidateHistoryForQuestion(candidateId, questionId) {
  		let rtn = new Promise(
  			(resolve, reject) => {
  				console.log("getCandidateHistoryForQuestion() has been called");
  				resolve();
  			}
  		);

  		return rtn;
	}
}
