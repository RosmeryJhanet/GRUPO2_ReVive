import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location as LocationModel } from '../../../models/location';
import { Locationservice } from '../../../services/locationservice';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-location-search',
  imports: [ReactiveFormsModule, 
    MatInputModule, MatButtonModule, MatIconModule, MatCardModule, CommonModule,],
  templateUrl: './location-search.html',
  styleUrl: './location-search.css',
})
export class LocationSearch {
  form: FormGroup;
  resultado: LocationModel | null = null;
  noEncontrado: boolean = false;

  constructor(
    private lS: Locationservice,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef 
  ) {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  buscar() {
    if (this.form.valid) {
      const id = Number(this.form.value.id);
      this.lS.listId(id).subscribe({
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
