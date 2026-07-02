import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDTO } from '../../../models/productDTO';
import { Barter } from '../../../models/barter';
import { Category } from '../../../models/category';
import { Productservice } from '../../../services/productservice';
import { Barterservice } from '../../../services/barterservice';
import { CategoryService } from '../../../services/categoryservice';

@Component({
  selector: 'app-product-insert',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './product-insert.html',
  styleUrl: './product-insert.css',
})
export class ProductInsert implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({});
  p: ProductDTO = new ProductDTO();
  listaTrueques: Barter[] = [];
  listaCategorias: Category[] = [];

  estadosConservacion: string[] = ['Excelente', 'Bueno', 'Regular', 'Malo'];

  constructor(
    private pS: Productservice,
    private bS: Barterservice,
    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      conservationStatus: ['', Validators.required],
      barter: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.bS.list().subscribe({
      next: (data) => {
        this.listaTrueques = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar trueques:', err);
        this.snackBar.open('No se pudo cargar la lista de trueques', 'Cerrar', { duration: 3000 });
      },
    });

    this.cS.list().subscribe({
      next: (data) => {
        this.listaCategorias = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.snackBar.open('No se pudo cargar la lista de categorías', 'Cerrar', { duration: 3000 });
      },
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.p.nameProduct = this.form.value.name;
    this.p.descriptionProduct = this.form.value.description;
    this.p.conservationStatus = this.form.value.conservationStatus;
    this.p.idBarter = Number(this.form.value.barter);
    this.p.idCategory = Number(this.form.value.category);

    this.pS.insert(this.p).subscribe({
      next: () => {
        this.snackBar.open('Producto registrado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/productos/listar']);
      },
      error: (err) => {
        this.snackBar.open(err.error ?? 'No se pudo registrar el producto', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
