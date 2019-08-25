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
          private _alertService: AlertService,
          private _attendanceAPIService: AttendanceAPIService,
          private _attendanceModelService: AttendanceModelService) {

  }

  ngOnInit() {
    this._attendanceModelService.init();
  }

  getListOfUsersInAttendance() {
    let rtn = this._attendanceModelService.getListOfUsersInAttendance();
    return rtn;
  }

  isSessionActive() {
    return this._attendanceModelService.isSessionActive();
  }

  onSessionBtnClicked() {
    let self = this;
    if (self._attendanceModelService.isSessionActive()) {
      self._alertService.show({
        header: 'You sure?',
        message: "There's already a recent session going. You REALLY want to start another one so soon?",
        buttons: [
          {
            text: 'No', role: 'cancel', handler: () => {
              // do nothing
            }
          }, {
            text: 'Yes', handler: () => {
              self._attendanceModelService.startNewSession();
            }
          }
        ]
      })
    } else {
      self._attendanceModelService.startNewSession();
    }
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

  getCurrentSessionNumber() {
    return this._attendanceModelService.getCurrentSessionNumber()
  }

  getCurrentSessionDateString() {
    return this._attendanceModelService.getCurrentSessionDateString()
  }

}
