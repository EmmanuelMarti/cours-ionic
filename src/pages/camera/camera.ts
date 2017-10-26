import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

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
	};
	base64ToGallery: Base64ToGallery;
	constructor(private camera: Camera, public navCtrl: NavController) { 
	}

	runCamera(){
		this.camera.getPicture(this.options).then((imageData) => {
	 	// imageData is either a base64 encoded string or a file URI
	 	// If it's base64:
	 	this.base64Image = 'data:image/jpeg;base64,' + imageData;
	 	this.base64ToGallery.base64ToGallery(base64Image, { prefix: '_img' }).then(
  			res => console.log('Saved image to gallery ', res),
  			err => console.log('Error saving image to gallery ', err)
		)
		}, (err) => {
	 	// Handle error
		});
	}
	

}


