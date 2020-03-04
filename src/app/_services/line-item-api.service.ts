import { Injectable } from '@angular/core';
import { ApiService } from './api.service'

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineItemAPIService {

	constructor(private _apiService: ApiService) {

	}

	getLineItem(lineItemId) {
	  	let url = environment.apiUrl + "/api/techprofile/lineitem/" + lineItemId;

		let rtn = new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data) => { 
						console.log("Line Item Received!");
						console.log(data);

						resolve(data);
					}, (err) => {
						reject(err);
					});
			});

		return rtn;
	}
}
