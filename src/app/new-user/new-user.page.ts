import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  	name = undefined;
  	phone = undefined;
  	email = undefined;

    constructor(private _location: Location ) {

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

	onSaveBtnClicked() {
		console.log("Save Btn Clicked!");
    	this._location.back();		
	}
}
