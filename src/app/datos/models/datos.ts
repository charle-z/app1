export class Datos{ //Variables globales
    datId: any
    datNombre: string
    datApellido: string
    datEdad: any
    datDeporte: string
    datImagen: string

    constructor(datId: any, datNombre: string, datApellido: string, datEdad: any, datDeporte: string, datImagen: string ) { //Variables locales
        this.datId = parseInt (datId)
        this.datNombre = (datNombre)
        this.datApellido = datApellido
        this.datEdad =  parseInt (datEdad)
        this.datDeporte = datDeporte
        this.datImagen = datImagen
    }
}