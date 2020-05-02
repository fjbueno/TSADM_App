import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  constructor(private contactoS: ContactoService, public alertController: AlertController, public toastController: ToastController, private loadCtrl: LoadingController) {
    this.listContact();
  }

  aContactos = [];

  listContact(){
    this.contactoS.listContact().subscribe(
      (data) => {
        this.aContactos = data;
      }
    );
  }
  
  async infoextra(contacto){
    let contactName = contacto.name;
    let contactInfo = contacto.address.street;
    let contactInfo1 = contacto.address.city;
    let contactInfo2 = contacto.address.zipcode;
    const alerta = await this.alertController.create({
      header: contactName,
      subHeader: 'Dirección: ',
      message: 'Calle: '+ contactInfo + '<br>' +
               'Ciudad: ' + contactInfo1 + '<br>' +
               'Código Postal: ' + contactInfo2,
      buttons: ['Ok']
    });
    await alerta.present();
  }

  ngOnInit() {
  }

}
