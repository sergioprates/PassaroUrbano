import {Oferta} from './shared/oferta.model'
import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {URL_API} from './app.api';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OfertasService {

	private readonly url: string = URL_API;
	constructor(private http: Http){

	}

    public getOfertas(): Promise<Oferta[]> {
		return this.http.get(this.url + '/ofertas?destaque=true').toPromise()
		.then((resposta: Response) =>
		{
			return resposta.json()
		});
	}
	
	public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
		return this.http.get(this.url +'/ofertas?categoria=' + categoria).toPromise()
		.then((resposta: Response) =>
		{
			return resposta.json()
		});
	}
	public getComoUsarOfertaPorId(id: number): Promise<string> {
		return this.http.get(this.url +'/como-usar?id=' + id).toPromise()
		.then((resposta: Response) =>
		{
			return resposta.json().shift().descricao;
		});
	}
	
	public getOfertaPorId(id: number): Promise<Oferta> {
		return this.http.get(this.url +'/ofertas?id=' + id).toPromise()
		.then((resposta: Response) =>
		{
			return resposta.json().shift();
		});
	}
	
	public pesquisaOfertas(termo: string): Observable<Oferta[]>{
		return this.http.get(this.url +'/ofertas?descricao_oferta_like=' + termo)		
		.retry(10)
		.map((resposta: Response) =>
		{
			return resposta.json();
		});
	}
}