import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { ItemDTO } from '../../../models/itemDTO';
import { ItemService } from '../../../services/itemservice';

@Component({
  selector: 'app-item-search',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './item-search.html',
  styleUrl: './item-search.css',
})
export class ItemSearch {
  form: FormGroup;
  resultado: ItemDTO | null = null;
  noEncontrado: boolean = false;

  constructor(
    private iS: ItemService,
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

      this.iS.listId(id).subscribe({
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