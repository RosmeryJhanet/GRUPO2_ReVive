import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { LocationList } from './location-list/location-list';



@Component({
  selector: 'app-locationcomponent',
  imports: [RouterOutlet,LocationList ],
  templateUrl: './locationcomponent.html',
  styleUrl: './locationcomponent.css',
})
export class Locationcomponent {
  constructor(public route:ActivatedRoute){}

}
