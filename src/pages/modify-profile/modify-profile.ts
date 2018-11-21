import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { Storage } from '@ionic/storage';
import { MenuChangerProvider } from '../../providers/menu-changer/menu-changer';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, private toast: ToasterProvider, private userProvider: UserProvider, 
    private storageProvider: StorageProvider, private storage: Storage, private menuChanger: MenuChangerProvider) {
    this.userData = this.navParams.get('userData');
    this.setReactiveForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyProfilePage');
  }

  async edit() {
    this.toast.present({
      message: 'Procesando...'
    });

    const storaged = await this.storageProvider.getData();
    let data = this.prepareData();
    data.email = storaged.email;

    console.log(data);

    this.userProvider.edit(data, storaged.id).subscribe(
      (res: any) => {
        console.warn(res);
        const data = res.data;
        if (res.status == 200) {
          this.toast.present({
            message: 'Modificado exitosamente',
            duration: 2000
          })
          this.storage.set('userData', data);
          this.menuChanger.user.username = data.username;
          this.menuChanger.user.firstName = data.firstName;
          this.menuChanger.user.lastName = data.lastName;
        }
      },
      (err: any) => {
        console.log(err);
        this.toast.present({
          message: 'Ocurrió un error, intente de nuevo mas tarde',
          duration: 2000
        })
      }
    )
  }

  prepareData(): any {
    const form = this.reactiveForm.value;
    return {
      username: form.username,
      firstName: form.name,
      lastName: form.lastName
    }
  }

  private setReactiveForm(): void {
    const user = this.menuChanger.user;
    this.reactiveForm = this.fb.group({
      name: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      username: [user.username, Validators.required]
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
