import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzidaPipe implements PipeTransform {
    transform(texto: string, truncarEm: number, iniciarEm: number) {
        if (texto != null && texto.length >truncarEm) {
            return texto.substring(iniciarEm, truncarEm) + '...';
        }
        
        return texto;
    }
}