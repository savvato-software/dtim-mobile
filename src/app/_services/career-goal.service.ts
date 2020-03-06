import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerGoalService {

	constructor(private _apiService: ApiService) {

	}

	getCareerGoalForUserId(userId) {
	  	let url = environment.apiUrl + "/api/user/" + userId + "/careergoal/";

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data) => { 
						console.log("Career Goal for user " + userId + " received!");
						console.log(data);

						resolve(data);
					}, (err) => {
						reject(err);
					});
			});

		return rtn;
	}

	getNextQuestionsForCareerGoal(userId, careerGoalId) {
	  	let url = environment.apiUrl + "/api/user/" + userId + "/careergoal/" + careerGoalId + "/questions";

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data) => { 
						console.log("Next Questions Toward Career Goal for user " + userId + " received!");
						console.log(data);

						resolve(data);
					}, (err) => {
						reject(err);
					});
			});

		return rtn;
	}

	getQuestionsAlreadyAskedInThisSession(userId, sessionId) {
		console.log("!!!!!!!!!!!!")
	  	let url = environment.apiUrl + "/api/user/" + userId + "/mockinterviewsession/" + sessionId + "/questions";

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data) => { 
						console.log("Questions Already Asked In This session for user " + userId + " received!");
						console.log(data);

						resolve(data);
					}, (err) => {
						reject(err);
					});
			});

		return rtn;
	}
}
