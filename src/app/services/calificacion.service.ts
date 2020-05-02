import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  
  private database: SQLiteObject;
  private dbLista = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private sqlite: SQLite){
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bd_tsadm.db',
        location: 'default'
      })
      .then((bd: SQLiteObject) => {
        this.database = bd;
        this.crearTabla().then(() => {
          this.dbLista.next(true);
        });
      })
    });
  }

  public obtenerEstadoBD(){
    return this.dbLista.asObservable();
  }

  private crearTabla(){
    const sql = 'CREATE TABLE IF NOT EXISTS calificacion ' + '(id INTEGER PRIMARY KEY AUTOINCREMENT, semana Text, actividad Text,calificacion INTEGER);'; 
    return this.database.executeSql(sql, []);
  }

  public agregarCalificacion(calificacion: calificacion){
    let data = [calificacion.semana, calificacion.actividad, calificacion.calificacion];
    const sql = 'INSERT INTO calificacion(semana, actividad, calificacion) VALUES(?,?,?)';
    return this.database.executeSql(sql, data);
  }

  public obtenerCalificacion(): Promise<any> {
    const sql = 'SELECT * FROM calificacion';
    return this.database.executeSql(sql, []).then(
      r=>{
        let listaCalificacion = [];
        for(var i=0; i<r.rows.length; i++){
          let c = new calificacion();
          c.id = r.rows.item(i).id;
          c.semana = r.rows.item(i).semana;
          c.actividad = r.rows.item(i).actividad;
          c.calificacion = r.rows.item(i).calificacion;
          listaCalificacion.push(c);
        }
        return listaCalificacion;
      }
    );
  }

  public eliminarCalificacion(id: number){
    const sql = 'DELETE FROM calificacion where id = ?';
    return this.database.executeSql(sql, [id]);
  }

}
