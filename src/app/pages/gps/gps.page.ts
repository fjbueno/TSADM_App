import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {

  mapRef: null;
  toast: any;

  constructor(private geolocation: Geolocation, private loadCtrl: LoadingController, public toastController: ToastController) {}

  ngOnInit(){
    this.loadMap();
  }

  async loadMap(){
    const loading = await this.loadCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    google.maps.event.addListenerOnce(this.mapRef, 'idle', () =>{
      loading.dismiss();
      this.addMaker(myLatLng.lat, myLatLng.lng);
      this.presentToast("Ubicacion" + "<br\ >Latitud: " + myLatLng.lat + "<br\ >Longitud: " + myLatLng.lng);
    });
  }

  private addMaker(lat: number, lng: number){
    const marker = new google.maps.Marker({
      position: { lat, lng },
      zoom: 12,
      map: this.mapRef,
      title: "Mi Posicion"
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  async presentToast(msg: string) {
    this.toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    this.toast.present();
  }

}
