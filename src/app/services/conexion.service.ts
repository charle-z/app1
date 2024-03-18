import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private _refresh$ = new Subject<void>(); //Para el refrescar

  get refresh$(){
    return this._refresh$
  }

  url = "http://127.0.0.1:80" //Direccion Backend


  constructor(public http:HttpClient) { }

  consultaDatos():Observable<any>{

    return this.http
    .get(this.url+"/consultaDatos")
    /* .pipe(tap(() =>{
      this._refresh$.next()
   })) *///Esto es para mandar actualizacion de los datos en tiempo real, algo que no es útil para esta aplicacion en este momento ya que hacer solicitudes en cada segundo es un gasto de batería enorme

  }
  
  createDatos(data): Observable<any>{
    return this.http
    .post(this.url + "/createDatos", JSON.stringify(data))
    .pipe(tap(() => {
      this._refresh$.next()
    }))
  }

  updateDatos(data): Observable<any>{
    return this.http
    .post(this.url + "/updateDatos", JSON.stringify(data))
    .pipe(tap(() => {
      this._refresh$.next()
    }))
  }

  removeDatos(data){
    return this.http
    .post(this.url + "/removeDatos", JSON.stringify(data))
    .pipe(tap(() => {
      this._refresh$.next()
    }))
  }

}
