import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ItemDTO } from '../../../models/itemDTO';
import { Category } from '../../../models/category';
import { ItemService } from '../../../services/itemservice';
import { CategoryService } from '../../../services/categoryservice';

@Component({
  selector: 'app-item-insert',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './item-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './item-insert.css',
})
export class ItemInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  item: ItemDTO = new ItemDTO();
  listaCategorias: Category[] = [];

  constructor(
    private iS: ItemService,
    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.listaCategorias = data;
    });

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      condition: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.item.itemName = this.form.value.name;
    this.item.itemDescription = this.form.value.description;
    this.item.itemCondition = this.form.value.condition;
    this.item.idCategory = this.form.value.category;

    this.iS.insert(this.item).subscribe({
      next: () => {
        this.snackBar.open('Artículo registrado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/items/listar']);
      },
    });
  }
}