import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';

// Appel du template html + ajout d'un selecteur pour l'ensemble de la page
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

	//déclaration des variables de classes
	base64Image:String;
	PathVideo: String;
	localUrl:String;
	options: CameraOptions = {
 		quality: 100,
  		destinationType: this.camera.DestinationType.DATA_URL,
  		encodingType: this.camera.EncodingType.JPEG,
  		mediaType: this.camera.MediaType.PICTURE
	};
	//Constructeur de la classe Camera 
	constructor(private camera: Camera, public navCtrl: NavController, private base64ToGallery : Base64ToGallery, 
		private localNotifications: LocalNotifications, private mediaCapture: MediaCapture) { 
	}

	// fonction qui permet de démarrer la caméra + d'enregistrer une image dans la gallerie du téléphone
	runCamera(){
		this.camera.getPicture(this.options).then((imageData) => {
		 	// imageData is either a base64 encoded string or a file URI
		 	// If it's base64:
		 	this.base64Image = 'data:image/jpeg;base64,' + imageData;
		 	this.base64ToGallery.base64ToGallery(imageData, { prefix: '_img' }).then(
	  			res =>{
	  				this.runNotif();
	  				console.log('Saved image to gallery ', res);
	  			}, 
	  			err =>{
	  				console.log('Error saving image to gallery ', err);
	  			} 
			)
		}, (err) => {
	 	// Handle error

		});
	}

	// Fonction qui permet d'envoyer une notification au téléphone
	runNotif(){
		this.localNotifications.schedule({
		   id: 1,
		   title: 'Nouvelle Image',
		   text: 'Vous avez une nouvelle image dans votre gallerie',
		});	
	}
	
	// Fonction qui va permettre d'enregistrer une vidéo et de l'afficher
	takeVideo(){
		let options: CaptureVideoOptions = { limit: 1 };
		this.mediaCapture.captureVideo(options)
		.then(
		    (data: MediaFile[]) =>{
		    	this.PathVideo = data[0].fullPath;
		    	console.log(data);
		    },
		    (err: CaptureError) => console.error(err)
		);
	}
}


