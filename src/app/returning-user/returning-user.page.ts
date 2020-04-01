import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

import { CountryPhone } from './country-phone.model';
import { PhoneValidator } from '../validators/phone.validator';


@Component({
  selector: 'app-returning-user',
  templateUrl: './returning-user.page.html',
  styleUrls: ['./returning-user.page.scss'],
})
export class ReturningUserPage implements OnInit {

	query = {
		phone: undefined,
		email: undefined
	}

	validations_form: FormGroup;
	country_phone_group: FormGroup;
	countries: Array<CountryPhone>;

    constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
    			private _userService: UserService,
    			private _alertService: AlertService,
    			private formBuilder: FormBuilder  ) {

	}
	
	validation_messages = {
		'name': [
		  { type: 'required', message: 'Name is required.' }
		],
		'email': [
		  { type: 'required', message: 'Email is required.' },
		  { type: 'pattern', message: 'Please enter a valid email, OR a ten digit phone number.' }
		],
		'phone': [
		  { type: 'required', message: 'Phone is required.' },
		  { type: 'validCountryPhone', message: 'Please enter a ten digit phone number, OR a valid email.' }
		]
	};

	ngOnInit() {
		this.countries = [
			new CountryPhone('US', 'United States')
		  ];
  
		  let country = new FormControl(this.countries[0], Validators.required);
		  let phone = new FormControl('', Validators.compose([
			PhoneValidator.validCountryPhone(country)
		  ]));
		  this.country_phone_group = new FormGroup({
			country: country,
			phone: phone
		  });
  
		  this.validations_form = this.formBuilder.group({
			name: new FormControl('', Validators.required),
			email: new FormControl('', Validators.compose([
			  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$')
			  ])),
			  country_phone: this.country_phone_group
		  },
		  {
			  updateOn: "blur"
		  }
		  );
	}

	getErrorMessages() {
		if((this.validations_form.controls.email.status === "VALID" && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$/.test(this.validations_form.controls.email.value)) && (this.validations_form.controls.country_phone.status === "VALID" && this.validations_form.controls.country_phone.value.phone.length === 10)) {
			console.log('valid email and phone')
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'You have entered a valid email address. Please clear this field OR provide a 10 digit phone number.' };
			this.validation_messages.email[1] = { type: 'pattern', message: 'You have entered a valid phone number. Please clear this field OR provide a valid email.' };
		} else if ((this.validations_form.controls.country_phone.status === "VALID" && this.validations_form.controls.country_phone.value.phone.toString().length === 10)) {
			this.validation_messages.email[1] = { type: 'pattern', message: 'You have entered a valid phone number. Please clear this field OR provide a valid email.' };
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'Please enter a ten digit phone number, OR a valid email.' };
		} else if ((this.validations_form.controls.email.status === "VALID" && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$/.test(this.validations_form.controls.email.value))) {
			console.log('valid email')
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'You have entered a valid email address. Please clear this field OR provide a 10 digit phone number.' };
			this.validation_messages.email[1] = { type: 'pattern', message: 'Please enter a valid email, OR a ten digit phone number.' };
		} else if ((this.validations_form.controls.email.status === "VALID" && !(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+([\.]{1})([a-zA-Z0-9]{2,3})$/.test(this.validations_form.controls.email.value)))) {
			console.log('invalid email with valid status');
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'Please enter a ten digit phone number, OR a valid email.' };
			this.validation_messages.email[1] = { type: 'pattern', message: 'Please enter a valid email, OR a ten digit phone number.' };
		} else {
			this.validation_messages.phone[1] = { type: 'validCountryPhone', message: 'Please enter a ten digit phone number, OR a valid email.' };
			this.validation_messages.email[1] = { type: 'pattern', message: 'Please enter a valid email, OR a ten digit phone number.' };
		}
	}

	

	onQueryChange($event) {
		if ($event.currentTarget.id == "phone") {
			this.query.phone = $event.currentTarget.value
		} else if($event.currentTarget.id == "email") {
			this.query.email = $event.currentTarget.value
		}
	}

	getQuery(value) {
		if (value == 'phone') {
			return this.query.phone;
		} else if(value == "email") {
			return this.query.email
		}
	}

	isSearchBtnEnabled() {
		if (this.query.email || this.query.phone){
			return true
		} else {
			return false
		}
	}

	onSearchBtnClicked() {
		let self = this;
		let data = undefined;

		if (self.query.email) {
			data = self.query.email
		} else {
			data = self.query.phone
		}

		self._userService.getUserByEmailOrPhone(data).then((user) => {
			
			if (user) {
				self._userService.markUserAsAttending(user["id"]).then(() => {
					self._alertService.show({
						header: 'Found you!',
						message: "We found your previous info.<br/><br/>Sweet!<br/><br/> Please hand the tablet to the next person. Thanks!",
						buttons: [
							{
								text: 'OK', role: 'cancel', handler: () => {
									this._location.back();
								}
							}
						]
					})
				})
			} else {
				self._alertService.show({
					header: 'Hmmm...',
					message: "Sorry, we couldn't find a profile with that info...<br/><br/>Do you want to create one?",
					buttons: [{
						text: "No, nevermind.",
						role: 'cancel'
					}, {
						text: 'Yes!',
						handler: () => {
					  		this._router.navigate(['/new-user']);
						}
					}]
				})
			}
		})			
	}

	onCancelBtnClicked() {
		this._router.navigate(['/home']);
	}
}
