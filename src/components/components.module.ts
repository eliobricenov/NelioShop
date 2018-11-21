import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card';
@NgModule({
	declarations: [CardComponent],
	imports: [IonicModule],
	exports: [CardComponent]
})
export class ComponentsModule {}
