import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../../util/validators/CustomValidators';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  reactiveForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.setReactiveForm();
  }

  private setReactiveForm(): void {
    this.reactiveForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      security: this.fb.group({
        password: ['', Validators.compose([
          Validators.required,
          Validators.pattern(CustomValidators.passwordRegex)
        ])],
        passwordConfirm: ['', Validators.required]
      }, { validator: CustomValidators.passMatcher })
    });
  }


  get name(): AbstractControl {
    return this.reactiveForm.get('name');
  }

  get lastName(): AbstractControl {
    return this.reactiveForm.get('lastName');
  }

  get username(): AbstractControl {
    return this.reactiveForm.get('username');
  }

  get security(): AbstractControl {
    return this.reactiveForm.get('security');
  }

  get password(): AbstractControl {
    return this.security.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.security.get('passwordConfirm');
  }

  get email(): AbstractControl {
    return this.reactiveForm.get('email');
  }


}
