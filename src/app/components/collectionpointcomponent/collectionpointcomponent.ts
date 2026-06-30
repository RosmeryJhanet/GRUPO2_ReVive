import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CollectionpointList } from './collectionpoint-list/collectionpoint-list';

@Component({
  selector: 'app-collectionpointcomponent',
  imports: [RouterOutlet, CollectionpointList],
  templateUrl: './collectionpointcomponent.html',
  styleUrl: './collectionpointcomponent.css',
})
export class Collectionpointcomponent {

  constructor(public route:ActivatedRoute){}
}
