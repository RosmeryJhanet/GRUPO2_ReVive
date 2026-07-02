import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { RecyclingDetailDTO } from '../../../models/recyclingDetailDTO';
import { RecyclingDetailService } from '../../../services/recyclingdetailservice';

@Component({
  selector: 'app-recyclingdetail-search',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './recyclingdetail-search.html',
  styleUrl: './recyclingdetail-search.css',
})
export class RecyclingdetailSearch {

  form: FormGroup;
  resultado: RecyclingDetailDTO | null = null;
  noEncontrado: boolean = false;

  constructor(
    private rdS: RecyclingDetailService,
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

      this.rdS.listId(id).subscribe({
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