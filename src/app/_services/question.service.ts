import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

	constructor(private _apiService: ApiService) {

	}

  getLineItemLevelAssociations(questionId) {
    let url = environment.apiUrl + "/api/question/" + questionId + "/lineitem/levels";

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

  setLineItemLevelAssociations(questionId, lilvassociations) {
    let url = environment.apiUrl + "/api/question/" + questionId + "/lineitem/levels";

    let data = '';

    for (var x=0; x < lilvassociations.length; x++) {
      if (x > 0) data += '&';

      data += 'liId' + x + '=' + lilvassociations[x][0] + '&liVal' + x + '=' + lilvassociations[x][1];
    }

    if (data.length > 0)
      data += '&count=' + lilvassociations.length;

    let rtn = new Promise(
      (resolve, reject) => {
      this._apiService.postUnsecuredAPI(url, data).subscribe(
        (data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      }
    );

    return rtn;
  }

  getAll() {
      let url = environment.apiUrl + "/api/question/all";

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
