import { Component, OnInit } from "@angular/core";  
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";

import { Socio } from "src/app/interfaces/socio";

@Component({
    selector: "app-socio",
    templateUrl: "./socio.component.html",
    styleUrls: ["./socio.component.css"]
})

export class SocioComponent implements OnInit {
    sexoList =[
        {id:1, value:"Masculino"},
        {id:2, value:"Femenino"}
    ];

    do: string = 'insert';
    position: any = 0;

    contacts: Array<Socio> = [];

    contact: Socio = {
        nombre: '',
        apellidos: '',
        numeroSocio: this.calcularNumeroSocio(),
        dni: '',
        telefono: '',
        sexo: '',
    };

    calcularNumeroSocio(){
        if (this.contact.lenght > 0){
            let numeroSocio = this.contact.map( function (x){
                return x.numeroSocio;
            }).reduce((a, b)=>Math.max(a, b));
            console.log(numeroSocio);
            return numeroSocio + 1;
        }else return 0;
    }

    constructor (private datePipe: DatePipe) {}

    ngOnInit(): void {}
    add(form: NgForm){
        if (this.do === 'insert') {
            this.contacts.push(this.contact);
        } else {
            this.contacts[this.position] = this.contact;
            this.do = 'insert';
        }

        this.contact = {
            nombre: '',
            apellidos: '',
            numeroSocio: this.calcularNumeroSocio(),
            dni: '',
            telefono: '',
            sexo: '',
        };
        form.resetForm();
    }
    delete(delPosition: number): void{
        this.contacts.splice(delPosition, 1);
        this.contact.numeroSocio = this.calcularNumeroSocio();
    }
    update(upPosition: number): void{
        this.contact = this.contacts[upPosition];
        this.do = 'update';
        this.position = upPosition;
    }
}

