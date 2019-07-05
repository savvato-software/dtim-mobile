import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _apiService: ApiService) {

  }

  createNewUser(name, phone, email) {
  	let url = environment.apiUrl + "/api/candidate/new";
  	let data = "name=" + name;

  	if (phone) {
  		data += "&phone=" + phone;
  	}

  	if (email) {
  		data += "&email=" + email;
  	}

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.postUnsecuredAPI(url, data).subscribe(
				(data) => { 
					console.log("New Account Saved!");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  markUserAsAttending(candidateId) {
  	let url = environment.apiUrl + "/api/candidate/" + candidateId + "/markInAttendance";

  	let data = "candidateId=" + candidateId;

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.postUnsecuredAPI(url, data).subscribe(
				(data) => { 
					console.log("Candidate " + candidateId + " marked in attendance!");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  getCandidateByEmailOrPhone(query) {
  	let url = environment.apiUrl + "/api/candidate?q=" + query;

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					console.log("Candidate query call returned");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

  getCandidateById(id) {
  	let url = environment.apiUrl + "/api/candidate/" + id;

	let rtn = new Promise(
		(resolve, reject) => {
			this._apiService.getUnsecuredAPI(url).subscribe(
				(data) => { 
					console.log("Candidate by id call returned");
					console.log(data);

					resolve(data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;

  }

}
