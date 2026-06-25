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

import { ItemDTO } from '../../../models/itemDTO';
import { ItemService } from '../../../services/itemservice';

@Component({
  selector: 'app-item-update',
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
  templateUrl: './item-update.html',
  styleUrl: './item-update.css',
})
export class ItemUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  item: ItemDTO = new ItemDTO();
  id: number = 0;

  constructor(
    private iS: ItemService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      condition: ['', [Validators.required, Validators.maxLength(50)]],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.iS.listId(this.id).subscribe({
      next: (data) => {
        this.form.patchValue({
          name: data.itemName,
          description: data.itemDescription,
          condition: data.itemCondition,
        });
      },
    });
  }

  actualizar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.item.itemId = this.id;
    this.item.itemName = this.form.value.name;
    this.item.itemDescription = this.form.value.description;
    this.item.itemCondition = this.form.value.condition;

    this.iS.update(this.item).subscribe({
      next: () => {
        this.snackBar.open('Artículo actualizado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/items/listar']);
      },
    });
  }
}