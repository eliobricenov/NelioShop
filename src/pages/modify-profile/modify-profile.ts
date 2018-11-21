import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

/**
 * Generated class for the ModifyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-profile',
  templateUrl: 'modify-profile.html',
})
export class ModifyProfilePage {

  userData;
  reactiveForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.userData = this.navParams.get('userData');
    this.setReactiveForm();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyProfilePage');
  }

  edit() {
    
  }

  private setReactiveForm(): void {
    this.reactiveForm = this.fb.group({
      name: [this.userData.firstName, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      username: [this.userData.username, Validators.required]
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

}
