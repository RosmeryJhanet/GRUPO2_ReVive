import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/categoryservice';

@Component({
  selector: 'app-category-search',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './category-search.html',
  styleUrl: './category-search.css',
})
export class CategorySearch {
  form: FormGroup;
  resultado: Category | null = null;
  noEncontrado: boolean = false;

  constructor(
    private cS: CategoryService,
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
      this.cS.listId(id).subscribe({
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
