import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechProfileAPIService {

  constructor(private _apiService: ApiService) {

  }

  get(techProfileId) {
  	let url = environment.apiUrl + "/api/techprofile/" + techProfileId;

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					console.log("getTechProfile API call returned");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  getScores(candidateId) {
  	let url = environment.apiUrl + "/api/candidate/" + candidateId + "/techprofile/scores";

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					console.log("get TechProfile scores for [" + candidateId + "] API call returned");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;  
  }

  saveScores(candidateId, scores) {
  	let url = environment.apiUrl + "/api/candidate/" + candidateId + "/techprofile/scores";

  	let data = this.JSON_to_URLEncoded(scores);

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.postUnsecuredAPI(url, data).subscribe(
				(data) => { 
					console.log("POST TechProfile scores for [" + candidateId + "] API call returned");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;  
  }

	JSON_to_URLEncoded(scores){
		var list = '';
	
		var ctr = 0;
		scores.map((score) => {
			list += "candidateId"+ctr+"="+score.candidateId;
			list += "&techProfileLineItemId"+ctr+"="+score.techProfileLineItemId;
			list += "&techProfileLineItemScore"+ctr+"="+score.techProfileLineItemScore;

			if (ctr+1 < scores.length)
				list += "&";

			ctr++;
		})

		list += "&count="+ (ctr);

		return list;
	}


}
