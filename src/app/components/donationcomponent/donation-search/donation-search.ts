import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Donation } from '../../../models/donation';
import { Donationservice } from '../../../services/donationservice';

@Component({
  selector: 'app-donation-search',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './donation-search.html',
  styleUrl: './donation-search.css',
})
export class DonationSearch { 

  form: FormGroup;
  resulta: Donation | null = null;
  noEncontrado: boolean = false;

  constructor(
    private dS: Donationservice,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  buscar(): void {
    if (this.form.valid) {
      const id = Number(this.form.value.id);

      this.dS.listId(id).subscribe({
        next: (data) => {
          this.resulta = data;
          this.noEncontrado = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.resulta = null;
          this.noEncontrado = true;
          this.cdr.detectChanges();
        },
      });
    }
  }


}
