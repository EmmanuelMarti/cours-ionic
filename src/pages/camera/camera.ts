import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

	base64Image:String;
	options: CameraOptions = {
 		quality: 100,
  		destinationType: this.camera.DestinationType.DATA_URL,
  		encodingType: this.camera.EncodingType.JPEG,
  		mediaType: this.camera.MediaType.PICTURE
	}
	constructor(private camera: Camera, public navCtrl: NavController) { 
	}

	runCamera(){
		this.camera.getPicture(this.options).then((imageData) => {
	 	// imageData is either a base64 encoded string or a file URI
	 	// If it's base64:
	 	this.base64Image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
	 	// Handle error
		});
	}
	

}


