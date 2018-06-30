import { ItemCarrinho } from "./shared/item-carrinho.mode";
import { Oferta } from "./shared/oferta.model";

class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[]{
        return this.itens;
    }

    public limparCarrinho(): void{
        this.itens = [];
    }

    public incluirItem(oferta: Oferta): void{
        
        var itemCarrinho = this.itens.find(x=> x.id == oferta.id);

        if (itemCarrinho == undefined) {
            let item = new ItemCarrinho(oferta.id, oferta.imagens[0], oferta.titulo,
            oferta.descricao_oferta, oferta.valor,1);
            
            this.itens.push(item);
            console.log('Item adicionado', item);
        }else{
            itemCarrinho.quantidade++;
            console.log('Incrementado valor', itemCarrinho);
        }
    }

    public totalCarrinho(): number{

        let total: number = 0;
        this.itens.map(x=>
        {
          total += (x.quantidade * x.valor);
        })
    
        return total;
      }

      public alterarQuantidade(item: ItemCarrinho, quantidade: number): void{
          let itemCarrinho = this.itens.find(x=> x.id == item.id);
          itemCarrinho.quantidade += quantidade;
        if (itemCarrinho.quantidade <= 0) {
            this.itens.splice(this.itens.indexOf(itemCarrinho), 1);
        }
          
      }
}

export {CarrinhoService} 