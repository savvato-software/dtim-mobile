import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  	name = undefined;
  	phone = undefined;
  	email = undefined;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
    			private _userService: UserService,
    			private _alertService: AlertService ) {

    }

  	ngOnInit() {
  		
  	}

	onNameChange($event) {
		this.name = $event.currentTarget.value;
	}

	getName() {
		return this.name;
	}

	onPhoneChange($event) {
		this.phone = $event.currentTarget.value;
	}

	getPhone() {
		return this.phone;
	}

	onEmailChange($event) {
		this.email = $event.currentTarget.value;
	}

	getEmail() {
		return this.email;
	}

	isSaveBtnEnabled() {
		return this.name && this.name.length > 3
				&& ((this.phone && this.phone.length == 10) || (
					this.email && this.email.length >= 6));
	}

	onSaveBtnClicked() {
		console.log("Save Btn Clicked!");
    	
    	let self = this;

    	self._userService.createNewUser(this.name, this.phone, this.email).then((candidate) => {
			self._userService.markUserAsAttending(candidate["id"]).then(() => {
				self._alertService.show({
					header: 'You\'re in!',
					message: "Your profile has been created. Please hand the tablet to the next person. Thanks!",
					buttons: [
						{
							text: 'OK', role: 'cancel', handler: () => {
								self._router.navigate(['/home']);
							}
						}
					]
				})
			})
    	})
	}

	onCancelBtnClicked() {
		console.log("Cancel Btn Clicked!");
    	this._router.navigate(['/home']);
	}
}
