import { Component, OnInit } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  selector: 'app-acelerometro',
  templateUrl: './acelerometro.page.html',
  styleUrls: ['./acelerometro.page.scss'],
})
export class AcelerometroPage {
  data: any;
  subscription: any;

  constructor() { }

  IniciarAcelerometro(){
    this.subscription = DeviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.data =acceleration;
    });
  }

  FinalizarAcelerometro(){
    this.subscription.unsubscribe();
  }

}
