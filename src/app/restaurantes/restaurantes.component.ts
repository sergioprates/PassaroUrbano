import { Component, OnInit } from '@angular/core';
import {OfertasService} from '../ofertas.service';
import {Oferta} from '../shared/oferta.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  constructor(private ofertasService: OfertasService ) { }
  public ofertas: Oferta[];
  ngOnInit() {

    this.ofertasService.getOfertasPorCategoria('restaurante').then((oferta)=>
    {
      this.ofertas = oferta;
    }).catch(ex=>
    {
      console.log(ex);
    });
  }

}
