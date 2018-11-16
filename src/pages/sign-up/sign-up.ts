import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../../util/validators/CustomValidators';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { UserProvider } from '../../providers/user/user';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder
    , private toast: ToasterProvider, private userProvider: UserProvider, private menuCtrl: MenuController) {
    menuCtrl.swipeEnable(false);
    this.setReactiveForm();
  }

  register(): void {
    this.toast.present({
      message: 'Procesando...'
    });

    const data = this.prepareData();

    console.log(data);

    this.userProvider.register(data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toast.present({
            message: 'Registrado exitosamente',
            duration: 2000
          })
        }
      },
      (err: any) => {
        console.log(err);
        if (err.status == 403) {
          this.toast.present({
            message: 'Usuario ya registrado en el sistema',
            duration: 2000
          })
        }
      }
    )
  }

  private prepareData(): object {
    const form = this.reactiveForm.value;
    return {
      firstName: form.name,
      lastName: form.lastName,
      email: form.email,
      password: form.security.password,
      confirmPassword: form.security.passwordConfirm,
      username: form.username
    };
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
