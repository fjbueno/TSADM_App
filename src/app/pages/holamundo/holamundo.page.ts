import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-holamundo',
  templateUrl: './holamundo.page.html',
  styleUrls: ['./holamundo.page.scss'],
})
export class HolamundoPage implements OnInit {

  Nombre; Sexo; Edad : String;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async enviar() {
    const alert = await this.alertController.create({
      header: 'Hola Mundo',
      message: 'Bienvenido: ' + this.Nombre 
      + '<br>De Sexo: ' + this.Sexo 
      + '<br>De Edad: ' + this.Edad,
      buttons: ['OK']
    });

    await alert.present();
  }

  limpiar(){
    this.Nombre = null;
    this.Edad = null;
    this.Sexo = null;
  }
}
