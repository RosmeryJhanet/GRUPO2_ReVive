import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { Chatiacomponent } from '../chatiacomponent/chatiacomponent';

@Component({
  selector: 'app-productcomponent',
  imports: [RouterOutlet, ProductList, Chatiacomponent],
  templateUrl: './productcomponent.html',
  styleUrl: './productcomponent.css',
})
export class Productcomponent {
  constructor(public route: ActivatedRoute) {}
}

