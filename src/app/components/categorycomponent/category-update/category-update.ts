import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/categoryservice';

@Component({
  selector: 'app-category-update',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './category-update.html',
  styleUrl: './category-update.css',
})
export class CategoryUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  ca: Category = new Category();
  id: number = 0;

  constructor(
    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      state: [true, Validators.required],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.cS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.nameCategory,
          description: data.descriptionCategory,
          state: data.stateCategory,
        });
      },
    });
  }

  actualizar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.ca.idCategory = this.id;
    this.ca.nameCategory = this.form.value.name;
    this.ca.descriptionCategory = this.form.value.description;
    this.ca.stateCategory = this.form.value.state;

    this.cS.update(this.ca).subscribe({
      next: () => {
        this.snackBar.open('Categoría actualizada correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/categorias/listar']);
      },
    });
  }
}
