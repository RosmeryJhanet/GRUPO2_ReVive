import { Component } from '@angular/core';
import { DonationList } from './donation-list/donation-list';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-donationcomponent',
  imports: [DonationList, RouterOutlet],
  templateUrl: './donationcomponent.html',
  styleUrl: './donationcomponent.css',
})
export class Donationcomponent {
  constructor(public route: ActivatedRoute) { }
}