import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Donation } from '../../../models/donation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Donationservice } from '../../../services/donationservice';

@Component({
  selector: 'app-donation-update',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './donation-update.html',
  styleUrl: './donation-update.css',
})
export class DonationUpdate implements OnInit{

  form: FormGroup = new FormGroup({});
  donations: Donation = new Donation();
  id: number = 0;

  constructor(
    private dS: Donationservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      namedonation: ['',[Validators.required, Validators.maxLength(50)]],
      itemid: ['',Validators.required],
      userid: ['',Validators.required],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

  }

}
