import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myNombre: String = ''
  
  constructor(private router: Router, 
              private toastController:ToastController) {}
  enviar(){
    if (this.myNombre.length > 0){
      console.log("Nombre: " + this.myNombre)
      this.router.navigate(['../datos',this.myNombre])
    } else {
      this.mensaje('Debe digitar el nombre')
    }
    
  }
/*   ngOnInit(){
    console.log('ngOnInit Home');
    
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter Home');
      
    }
    ionViewDidEnter(){
    console.log('ionViewDidEnter Home');
  
    }
    ionViewWillLeave(){
    console.log('ionViewWillLeave Home');
    }
    ionViewDidLeave(){
    console.log('ionViewDidLeave Home');
    }
    ngOnDestroy(){
      console.log('ngOnDestroy Home');
      
    } */
  
  async mensaje(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
