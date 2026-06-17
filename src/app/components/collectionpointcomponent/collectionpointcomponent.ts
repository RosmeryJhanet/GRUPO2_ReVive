import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-collectionpointcomponent',
  imports: [RouterOutlet],
  templateUrl: './collectionpointcomponent.html',
  styleUrl: './collectionpointcomponent.css',
})
export class Collectionpointcomponent {

  constructor(public route:ActivatedRoute){}
}
