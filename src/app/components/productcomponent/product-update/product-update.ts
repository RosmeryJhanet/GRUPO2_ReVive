import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  selector: 'app-product-update',
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
  templateUrl: './product-update.html',
  styleUrl: './product-update.css',
})
export class ProductUpdate implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({});
  p: ProductDTO = new ProductDTO();
  id: number = 0;
  listaTrueques: Barter[] = [];
  listaCategorias: Category[] = [];

  estadosConservacion: string[] = ['Excelente', 'Bueno', 'Regular', 'Malo'];

  constructor(
    private pS: Productservice,
    private bS: Barterservice,
    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.pS.listId(this.id).subscribe({
      next: (data) => {
        this.p = data;
        this.form.patchValue({
          name: data.nameProduct,
          description: data.descriptionProduct,
          conservationStatus: data.conservationStatus,
          barter: data.idBarter,
          category: data.idCategory,
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
        this.snackBar.open('No se pudo cargar la información del producto', 'Cerrar', { duration: 3000 });
      },
    });
  }

  ngAfterViewInit(): void {
    this.bS.list().subscribe({
      next: (data) => {
        this.listaTrueques = data;
        this.cdr.detectChanges();
      },
    });

    this.cS.list().subscribe({
      next: (data) => {
        this.listaCategorias = data;
        this.cdr.detectChanges();
      },
    });
  }

  actualizar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.p.iddProduct = this.id;
    this.p.nameProduct = this.form.value.name;
    this.p.descriptionProduct = this.form.value.description;
    this.p.conservationStatus = this.form.value.conservationStatus;
    this.p.idBarter = Number(this.form.value.barter);
    this.p.idCategory = Number(this.form.value.category);

    this.pS.update(this.id, this.p).subscribe({
      next: () => {
        this.snackBar.open('Producto actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/productos/listar']);
      },
      error: (err) => {
        this.snackBar.open(err.error ?? 'No se pudo actualizar el producto', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
