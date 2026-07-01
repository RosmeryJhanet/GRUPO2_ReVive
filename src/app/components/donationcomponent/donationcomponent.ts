import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DonationList } from './donation-list/donation-list';

@Component({
  selector: 'app-donationcomponent',
  imports: [RouterOutlet, DonationList],
  templateUrl: './donationcomponent.html',
  styleUrl: './donationcomponent.css',
})
export class Donationcomponent {

  constructor(public route: ActivatedRoute) {}

}
