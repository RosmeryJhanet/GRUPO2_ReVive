import { Component } from '@angular/core';
import { ItemList } from './item-list/item-list';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-itemcomponent',
  imports: [ItemList, RouterOutlet],
  templateUrl: './itemcomponent.html',
  styleUrl: './itemcomponent.css',
})
export class Itemcomponent {
    constructor(public route: ActivatedRoute) { }
}
