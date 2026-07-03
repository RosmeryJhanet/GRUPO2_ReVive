import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

import { ProductDTO } from '../../../models/productDTO';
import { Barter } from '../../../models/barter';
import { Category } from '../../../models/category';
import { Productservice } from '../../../services/productservice';
import { Barterservice } from '../../../services/barterservice';
import { CategoryService } from '../../../services/categoryservice';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-search',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch implements OnInit {
  form: FormGroup;
  resultado: ProductDTO | null = null;
  noEncontrado: boolean = false;

  trueques: Barter[] = [];
  categorias: Category[] = [];

  constructor(
    private pS: Productservice,
    private bS: Barterservice,
    private cS: CategoryService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    forkJoin({
      trueques: this.bS.list(),
      categorias: this.cS.list()
    }).subscribe({
      next: (res) => {
        this.trueques = res.trueques;
        this.categorias = res.categorias;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar dependencias en la busqueda:', err);
      }
    });
  }

  getBarterDescription(id: number): string {
    const b = this.trueques.find((x) => x.idBarter === id);
    return b ? b.descriptionBarter : 'Sin trueque';
  }

  getCategoryName(id: number): string {
    const c = this.categorias.find((x) => x.idCategory === id);
    return c ? c.nameCategory : 'Sin categoría';
  }

  buscar(): void {
    if (this.form.valid) {
      const id = Number(this.form.value.id);
      this.pS.listId(id).subscribe({
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
