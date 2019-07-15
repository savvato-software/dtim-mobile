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

  addTopic(name) {
  	let url = environment.apiUrl + "/api/techprofile/topics/new"

  	let data = "topicName="+name

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.postUnsecuredAPI(url, data).subscribe(
  				(data) => {
  					console.log("POST addTopic [" + name + "] API call returned")
  					console.log(data)

  					resolve(data)
  				}, (err) => {
  					reject(err)
  				});
  		});

  	return rtn;
  }

  addLineItem(topicId, name) {
  	return this.addLineItemWithDescriptions(topicId, name, "level 0 desc", "level 1 desc", "level 2 desc", "level 3 desc");
  }

  addLineItemWithDescriptions(topicId, name, l0description, l1description, l2description, l3description) {
  	let url = environment.apiUrl + "/api/techprofile/topics/" + topicId + "/lineitem/new"

  	let data = "lineItemName="+name
  		+"&l0description="+l0description
  		+"&l1description="+l1description
  		+"&l2description="+l2description
  		+"&l3description="+l3description;

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.postUnsecuredAPI(url, data).subscribe(
  				(data) => {
  					console.log("POST addLineItem [" + name + "] API call returned")
  					console.log(data)

  					resolve(data)
  				}, (err) => {
  					reject(err)
  				});
  		});

  	return rtn;
  }

  updateLineItemWithDescriptions(lineItem) {
  	let url = environment.apiUrl + "/api/techprofile/lineitem/" + lineItem["id"];

  	let data = "lineItemName="+lineItem["name"]
  		+"&l0description="+lineItem["l0description"]
  		+"&l1description="+lineItem["l1description"]
  		+"&l2description="+lineItem["l2description"]
  		+"&l3description="+lineItem["l3description"];

  	let rtn = new Promise(
  		(resolve, reject) => {
  			this._apiService.postUnsecuredAPI(url, data).subscribe(
  				(data) => {
  					console.log("POST updateLineItem [" + lineItem['id'] + "] API call returned")
  					console.log(data)

  					resolve(data)
  				}, (err) => {
  					reject(err)
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
