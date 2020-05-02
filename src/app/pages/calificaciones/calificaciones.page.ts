import { Component, OnInit } from '@angular/core';
import { calificacion } from 'src/app/models/calificacion';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
})
export class CalificacionesPage {

  calificaciones = [];
  c: calificacion;

  constructor(public cService: CalificacionService, public alertController: AlertController, public toastController: ToastController) { 
    this.cService.obtenerEstadoBD().subscribe(
      r => {
        if(r){
            this.obtenerCalificacion();
        }
      }
    );
  }

  obtenerCalificacion() {
    this.cService.obtenerCalificacion().then(
      r=>{
        this.calificaciones = r;
      }
    );
  }

  async mensajeToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async nuevaCalificacion(){
    const alertController = await this.alertController.create({
      header: 'Nueva Calificacion',
      inputs: [
        {
          placeholder: 'Semana',
          type: 'text',
          name: 'semana'
        },
        {
          placeholder: 'Tipo de Actividad',
          type: 'text',
          name: 'actividad'
        },
        {
          placeholder: 'Calificacion',
          type: 'number',
          name: 'calificacion',
          min: 0,
          max: 10
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: data => {
            this.c = new calificacion;
            this.c.semana = data.semana;
            this.c.actividad = data.actividad;
            this.c.calificacion = data.calificacion;
            this.cService.agregarCalificacion(this.c).then(
              r =>{
                this.obtenerCalificacion();
              }
            )
          }
        }
      ]
    });
    await alertController.present();
  }

   async eliminarcalificacion(c: calificacion, index){
    const alert = await this.alertController.create({
      header: 'Confirma eliminar calificacion',
      buttons: [
      {
        text: 'Cancelar',
        handler: () =>{}
      },
      {
        text: 'Ok',
        handler: data => {
          this.eliminar(c.id)
        }
      }
      ]
    });
    await alert.present();
  }

  eliminar(id: number){
    this.cService.eliminarCalificacion(id)
    .then( r => {
      this.obtenerCalificacion();
    });
  }

}
