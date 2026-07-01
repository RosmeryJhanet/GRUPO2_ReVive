import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Barter } from '../../../models/barter';
import { Barterservice } from '../../../services/barterservice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barter-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './barter-search.html',
  styleUrl: './barter-search.css',
})
export class BarterSearch {
  form: FormGroup;
  resultado: Barter | null = null;
  noEncontrado: boolean = false;

  constructor(
    private bS: Barterservice,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  buscar() {
    if (this.form.valid) {
      const id = Number(this.form.value.id);
      this.bS.listId(id).subscribe({
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
