import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RecyclingdetailList } from './recyclingdetail-list/recyclingdetail-list';
@Component({
  selector: 'app-recyclingdetailcomponent',
  imports: [RecyclingdetailList, RouterOutlet],
  templateUrl: './recyclingdetailcomponent.html',
  styleUrl: './recyclingdetailcomponent.css',
})
export class Recyclingdetailcomponent {
constructor(public route: ActivatedRoute) { }
}
