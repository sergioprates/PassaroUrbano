import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { CarrinhoService} from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.mode';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number;
  public itensCarrinho: ItemCarrinho[] = [];

  public formulario: FormGroup = this.instanciarForm();

  

  constructor(private ordemCompraService: OrdemCompraService,
  private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
    console.log("Ordem Compra:", this.carrinhoService.exibirItens());
  }

  public confirmarCompra(): void {
    if (this.formulario.invalid == true) {
      this.markFormGroupTouched(this.formulario);
      console.log('Formulário inválido');
    }
    else{
      console.log('Formulário válido');

      if (this.itensCarrinho.length == 0) {
        alert('Nenhum item selecionado!');
        return;
      }
      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.exibirItens()
      );

      this.ordemCompraService.efetivarCompra(pedido).subscribe(idPedido=>
      {
        this.idPedidoCompra = idPedido;
        console.log('pedido');
      })
    }
  }

  public alterarQuantidade(item: ItemCarrinho, quantidade: number): void{
    this.carrinhoService.alterarQuantidade(item, quantidade);
}

 

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  private instanciarForm(): FormGroup{
    return new FormGroup({
      'endereco': new FormControl(null, [Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(120)]),
      'numero':new FormControl(null,[Validators.required, 
        Validators.minLength(1),
        Validators.maxLength(20)]),
      'complemento':new FormControl(null),
      'formaPagamento':new FormControl('',[Validators.required])
    });
  }
  
}
