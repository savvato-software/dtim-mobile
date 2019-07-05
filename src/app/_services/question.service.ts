import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

	constructor(private _apiService: ApiService) {

	}

  getQuestionById(id) {
      let url = environment.apiUrl + "/api/question/" + id;

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
      let url = environment.apiUrl + "/api/candidate/" + candidateId + "/question/" + questionId + "/history";

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

  setSessionScore(candidateId, questionId, sessionId, dataObj) {
      let url = environment.apiUrl + "/api/candidate/" + candidateId + "/question/" + questionId + "/history";
      let data = "sessionId=" + sessionId + "&score=" + dataObj["score"];

      if (dataObj["comment"]) 
        data += "&comment=" + dataObj["comment"];

      let rtn = new Promise(
        (resolve, reject) => {
        this._apiService.postUnsecuredAPI(url, data).subscribe(
          (data) => { 
            console.log("Question Session Score Updated!");
            console.log(data);

            resolve(data);
          }, (err) => {
            reject(err);
          });
      });

      return rtn;
  }

}
