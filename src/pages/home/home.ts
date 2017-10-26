import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	name: String = "NameApp";
	app: any = {name:String, version:Number}
  constructor(public navCtrl: NavController) {
  		this.app.name= "Manu Appli";
  		this.app.version = 3.0;
  }

}
