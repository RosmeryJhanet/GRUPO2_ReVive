import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CategoryList } from './category-list/category-list';

@Component({
  selector: 'app-categorycomponent',
  imports: [RouterOutlet, CategoryList],
  templateUrl: './categorycomponent.html',
  styleUrl: './categorycomponent.css',
})
export class Categorycomponent {
  constructor(public route: ActivatedRoute) {}
}