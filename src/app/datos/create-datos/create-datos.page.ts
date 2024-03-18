import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/services/conexion.service';
import { Datos } from '../models/datos';

@Component({
  selector: 'app-create-datos',
  templateUrl: './create-datos.page.html',
  styleUrls: ['./create-datos.page.scss'],
})
export class CreateDatosPage implements OnInit {
  @Input() datos: Partial<Datos>
  isUpdate: Boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    private conexion: ConexionService,
    private toast: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.updateDatos()
  }

  form = new FormGroup({
    datId: new FormControl('', []),
    datNombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    datApellido: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    datEdad: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    datDeporte: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    datImagen: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
  })

  async onSubmit() {
    const dat = this.form.value
    if (this.isUpdate) {
      let id = this.datos.datId
      this.datos = dat
      this.datos.datId = id //Esta linea de codigo solo se hace cuando es autoincrementable
      const loading = await this.loadingCtrl.create({
        message: 'Actualizando Datos...'
      })
      await loading.present()

      this.conexion.updateDatos(this.datos).subscribe(data => {
        this.presentToast('El dato fue modificado con éxito.', 'Dato modificado.');
        /* this.presentAlert()*/
        loading.dismiss();
        this.closeModal();
      }, error => {
        this.error('Error', 'Ocurrió un error al modificar el dato.')
      })

    }
    else {
      this.datos = dat;
      this.datos.datId = 0 //Se le envía un caracter para que la base de datos no recoja los nuevos datos sin Id, la base de datos es a la final la que asigna el valor con el autoincremental
      const loading = await this.loadingCtrl.create({
        message: 'Creando Datos...'
      })
      await loading.present()
      this.conexion.createDatos(this.datos).subscribe(dat => {
        this.presentToast("El Dato fue guardado con éxito.", "Dato guardado.")
        loading.dismiss()
        this.closeModal()
      }, eror => {
        this.error('Error', 'Ocurrió un error al crear el Dato.')
      }
      )
    }
  }

  async error(encabezado: string, mensaje: string) {
    const toast = await this.toast.create({
      header: encabezado,
      message: mensaje,
      duration: 2000
    })
    toast.present()
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'closed')
  }

  async presentToast(encabezado: string, mensaje: string) {
    const toast = await this.toast.create({
      header: encabezado,
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  updateDatos() {
    if (this.datos) { //Si recibió la información entonces
      this.isUpdate = true;
      this.form.patchValue({
        datNombre: this.datos.datNombre,
        datApellido: this.datos.datApellido,
        datEdad: this.datos.datEdad.toString(),
        datDeporte: this.datos.datDeporte,
        datImagen: this.datos.datImagen
      })
    }
  }

}
