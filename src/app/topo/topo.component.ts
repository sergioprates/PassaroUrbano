import { Component, OnInit } from '@angular/core';
import {OfertasService} from '../ofertas.service';
import { Observable } from 'rxjs/Observable';
import { Oferta } from '../shared/oferta.model';
import { Subject } from 'rxjs/Subject';
import '../util/rxjs-extensions';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  constructor(private ofertasService: OfertasService) { }

  public ofertasObservable: Observable<Oferta[]>;
  //public ofertas: Oferta[];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  ngOnInit() {
   this.ofertasObservable =  this.subjectPesquisa
   .distinctUntilChanged()
   .switchMap((termo: string, index: number)=>
    {
      if (termo.trim() == '') {
        return Observable.of<Oferta[]>([]);
      }
      return this.ofertasObservable = this.ofertasService.pesquisaOfertas(termo);
    })
    .catch((ex: any)=>
    {
      console.log(ex);
      return Observable.of<Oferta[]>([]);
    });

  }

  public pesquisa(termoDaBusca: string){
    console.log('pesquisa:', termoDaBusca);
    //subject garante que apenas o último evento seja executado.
    this.subjectPesquisa.next(termoDaBusca);

  }

}
