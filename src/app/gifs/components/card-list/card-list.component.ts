import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styles: ``
})
export class CardListComponent {
  @Input()
  public gifs:Gif[] = []
  
}
