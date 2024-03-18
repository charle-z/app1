import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ConexionService } from '../services/conexion.service';
import { CreateDatosPage } from './create-datos/create-datos.page';
import { Datos } from './models/datos';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  
  //Se registra la posición de los números para transformarla en verdadero
  mostrarElegido:{[key:number]:boolean} = {}
  
  nombre: string = ''
  datos: Datos[]
  subscription: Subscription;//Actualizar la página
  constructor(
    private activatedRoute: ActivatedRoute,
    private conexion:ConexionService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    /* console.log('ngOnInit Datos'); */
    this.nombre = this.activatedRoute.snapshot.paramMap.get('id')
    this.agregarDatos()

    this.subscription = this.conexion.refresh$.subscribe(() => {
      this.agregarDatos()
    })
    
  }
  /* ionViewWillEnter(){
  console.log('ionViewWillEnter Datos');
    
  }
  ionViewDidEnter(){
  console.log('ionViewDidEnter Datos');

  }
  ionViewWillLeave(){
  console.log('ionViewWillLeave Datos');
  }
  ionViewDidLeave(){
  console.log('ionViewDidLeave Datos');
  } */
  ngOnDestroy(){
    /* console.log('ngOnDestroy Datos'); */
    this.subscription.unsubscribe()
  }
  //Es como si fuera una tabla en excel que fuera una BD de dichos parámetros
  agregarDatos(){
    this.conexion.consultaDatos().subscribe(
      data => {
        this.datos = data
      }, error => {console.log(error)}
    )
/*     this.datos = [
      {
        nombre: "Carlos",
        apellido: "Acosta",
        edad: 19,
        deporte: "Ajedrez",
        imagen: "https://as01.epimg.net/masdeporte/imagenes/2021/12/04/polideportivo/1638632751_928678_1638632851_noticia_normal.jpg"
      },
      {
        nombre: "Chris",
        apellido: "Bolchov",
        edad: 27,
        deporte: "Voleibol",
        imagen: "https://cdn.todamateria.com/imagenes/voleibol-og.jpg"
      },
      {
        nombre: "Maria",
        apellido: "Gutierrez",
        edad: 22,
        deporte: "Natación",
        imagen: "https://www.eluniverso.com/resizer/DrQ9M48XYsvhYP-Zg-vEPShzcRQ=/1005x670/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/eluniverso/VAZL4VM45NAJXHNHXFIUMV4QSQ.jpg"
      }
    ] */
  }
  //Esto es para mostrar o retraer las etiquetas de los datos de las personas 
  elegido(i:number){
    if(this.mostrarElegido[i]){
    this.mostrarElegido[i] = false
  }else{
    this.mostrarElegido[i] = true
    }
  }

  interface(i){
    if (this.datos[i].datDeporte === "Futbol"){
      this.router.navigate(['../futbol'])
    }
  }

  doRefresh(event){
    this.datos = []
    this.conexion.consultaDatos().subscribe(
      data => {
        this.datos = data
        event.target.complete()
      }, error => {console.log(error)}
      )
  }

  create(){
    this.modalCtrl.create({component : CreateDatosPage})
    .then((modal) => {
      modal.present();
      return modal.onDidDismiss()
    }
    )
  }

  updateDatos(datos:Datos){
    this.modalCtrl.create({component : CreateDatosPage, componentProps: {datos}})
    .then((modal) => {
      modal.present();
      return modal.onDidDismiss()
    }
    )
  }

  removeDatos(datId:any){
    let remove = {}
    remove["datId"] = datId
    this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Está seguro que desea eliminar?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.conexion.removeDatos(remove).subscribe(
              data => {
                this.mensaje("El dato fue eliminado con éxito.")
              })
          },
        },
      ],
    })
    .then((alertE1) => alertE1.present())
  }

  async mensaje(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
