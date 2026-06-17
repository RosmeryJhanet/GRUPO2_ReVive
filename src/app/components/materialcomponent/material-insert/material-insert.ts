import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Material } from '../../../models/Material';
import { Materialservice } from '../../../services/materialservice';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-material-insert',
  imports: [ MatInputModule, 
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule, MatIconModule],
  templateUrl: './material-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './material-insert.css',
})
export class MaterialInsert implements OnInit {

 form: FormGroup = new FormGroup({});
  pro: Material = new Material();

  constructor(
    private mS: Materialservice,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],

    });
  }
  aceptar() {
    if (this.form.valid) {
      this.pro.materialName = this.form.value.name;
      this.pro.materialDescription = this.form.value.description;
      this.pro.materialType = this.form.value.type;

      this.mS.insert(this.pro).subscribe({
        next: () => {
          this.router.navigate(['/materiales/listar']);
        },
      });
    }
  }
}
