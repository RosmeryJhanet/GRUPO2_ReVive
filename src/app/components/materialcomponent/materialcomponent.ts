import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MaterialList } from './material-list/material-list';

@Component({
  selector: 'app-materialcomponent',
  imports: [RouterOutlet, MaterialList],
  templateUrl: './materialcomponent.html',
  styleUrl: './materialcomponent.css',
})
export class Materialcomponent {
  constructor(public route:ActivatedRoute){}
}
