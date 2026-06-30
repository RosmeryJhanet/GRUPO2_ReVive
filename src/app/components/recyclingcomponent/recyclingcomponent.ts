import { Component } from '@angular/core';
import { RecyclingList } from './recycling-list/recycling-list';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recyclingcomponent',
  imports: [RecyclingList, RouterOutlet],
  templateUrl: './recyclingcomponent.html',
  styleUrl: './recyclingcomponent.css',
})
export class Recyclingcomponent {
    constructor(public route: ActivatedRoute) { }
}
