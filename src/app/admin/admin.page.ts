import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { AttendanceAPIService } from '../_services/attendance-api.service';
import { AttendanceModelService } from '../_services/attendance-model.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  inAttendanceList = undefined;
  sessionActive = undefined;

  constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
          private _attendanceAPIService: AttendanceAPIService,
          private _attendanceModelService: AttendanceModelService) {

  }

  ngOnInit() {
  
  }


  //
  // TODO: Replace AttendanceAPI calls with AttendanceModel calls


  getListOfUsersInAttendance() {
  	if (this.inAttendanceList === undefined) {
  		this.inAttendanceList = null;

  		this._attendanceAPIService.getThoseWithinTheLastThreeHours().then((list) => {
  			console.log("got attendance list for the last three hours")
        this.inAttendanceList = list;
  		})
  	}

  	return this.inAttendanceList;
  }

  isSessionActive() {
    return this._attendanceModelService.isSessionActive();
  }

  onSessionBtnClicked() {
    let self = this;
    self._attendanceModelService.startNewSession();
  }

  onUserClick(user) {
    this._router.navigate(['/user-tech-profile/' + user["id"]]);
  }

  onHomeBtnClicked() {
    this._router.navigate(['/home']);
  }

  onQuestionsBtnClicked() {
    this._router.navigate(['/tech-profile-question']);
  }

  onTechProfileEditBtnClicked() {
    this._router.navigate(['/tech-profile-edit'])
  }
}
