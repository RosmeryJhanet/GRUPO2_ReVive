import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BarterList } from './barter-list/barter-list';
import { Chatiacomponent } from '../chatiacomponent/chatiacomponent';

@Component({
  selector: 'app-bartercomponent',
  imports: [RouterOutlet, BarterList, Chatiacomponent],
  templateUrl: './bartercomponent.html',
  styleUrl: './bartercomponent.css',
})
export class Bartercomponent {
  constructor(public route: ActivatedRoute) {}
}
