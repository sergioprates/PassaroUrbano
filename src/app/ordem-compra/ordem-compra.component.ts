import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(120)]),
    'numero':new FormControl(null,[Validators.required, 
      Validators.minLength(1),
      Validators.maxLength(20)]),
    'complemento':new FormControl(null),
    'formaPagamento':new FormControl('',[Validators.required])
  });

  public idPedidoCompra: number;

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompra(): void {
    if (this.formulario.invalid == true) {
      this.markFormGroupTouched(this.formulario);
      console.log('Formulário inválido');
    }
    else{
      console.log('Formulário válido');

      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento
      );

      this.ordemCompraService.efetivarCompra(pedido).subscribe(idPedido=>
      {
        this.idPedidoCompra = idPedido;
        console.log('pedido');
      })
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
  
}
