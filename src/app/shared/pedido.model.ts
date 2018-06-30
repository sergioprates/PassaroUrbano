import { ItemCarrinho } from "./item-carrinho.mode";

export class Pedido {
    constructor(
    public endereco: string,
    public numero: string,
    public complemento: string,
    public formaPagamento: string,
    public itensPedido: ItemCarrinho[]){
        
    }
}