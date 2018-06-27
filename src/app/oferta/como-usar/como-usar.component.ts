import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Params} from '@angular/router';
import { OfertasService } from '../../ofertas.service';



@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: OfertasService) { }

  public descricao: string;

  ngOnInit() {

    this.route.params.subscribe((params: Params)=>
    {
      this.service.getComoUsarOfertaPorId(params.id).then(result =>
        {
          this.descricao = result;
        });
    });
    
    
  }

}
