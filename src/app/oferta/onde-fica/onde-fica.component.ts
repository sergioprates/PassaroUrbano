import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../ofertas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

  constructor(private service: OfertasService, private route: ActivatedRoute) { }

  ngOnInit() {
    var id = this.route.parent.snapshot.params.id;
  }

}
