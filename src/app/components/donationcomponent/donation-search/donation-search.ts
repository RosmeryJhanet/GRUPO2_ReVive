import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { DonationDTO } from '../../../models/donationDTO';
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
  resultado: DonationDTO | null = null;
  noEncontrado: boolean = false;

  constructor(
    private dS: Donationservice,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
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
          this.resultado = data;
          this.noEncontrado = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.resultado = null;
          this.noEncontrado = true;
          this.cdr.detectChanges();
        },
      });
    }
  }
}