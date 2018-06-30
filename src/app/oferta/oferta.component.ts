import { Component, OnInit } from '@angular/core';

import {OfertasService} from '../ofertas.service';
import {Oferta} from '../shared/oferta.model';
import { ActivatedRoute, Params } from '@angular/router';
import { interval } from 'rxjs/observable/interval';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {CarrinhoService} from '../carrinho.service';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[OfertasService]
})
export class OfertaComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private ofertaService: OfertasService,
    private carrinhoServico: CarrinhoService) { 

  }

  public oferta: Oferta;

  ngOnInit() {
  console.log("Oferta: ", this.carrinhoServico.exibirItens());

    this.route.params.subscribe((params: Params)=>
    {
      var id = params['id'];
      this.ofertaService.getOfertaPorId(id).then(result=>
      {
        this.oferta = result;
      }).catch(ex=>
      {
        console.log(ex);
      });
    });
  }

  public AdicionarItemCarrinho(oferta: Oferta): void{

    this.carrinhoServico.incluirItem(oferta);

  }

}
