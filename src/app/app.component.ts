import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate : any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public alertController: AlertController,
    private statusBar: StatusBar
  ) 
  {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu(){
    this.navigate =
    [
      {
        title : 'Bienvenida',
        url   : 'bienvenida',
        icon  : 'home-outline'
      },
      {
        title : 'Hola Mundo',
        url   : 'holamundo',
        icon  : 'planet-outline'
      },
      {
        title : 'Contactos',
        url   : 'contactos',
        icon  : 'people-outline'
      },
      {
        title : 'Sensores',
        url   : 'sensores',
        icon  : 'compass-outline'
      },
      {
        title : 'Mis calificaciones',
        url   : 'calificaciones',
        icon  : 'school-outline'
      }
    ]
  }

async cerrarApp(){
  const alertController = await this.alertController.create({
    header: "Saliendo de la Aplicacion",
    buttons:[
      {
        text: 'Cancelar',
        handler: () =>{}
      },{
        text: 'Ok',
        handler: () => {
          navigator['app'].exitApp();
        }
      }
    ]
  });
  await alertController.present();
}
}
