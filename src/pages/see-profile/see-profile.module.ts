import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeProfilePage } from './see-profile';

@NgModule({
  declarations: [
    SeeProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SeeProfilePage)
  ]
})
export class SeeProfilePageModule {}
