import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Donation } from '../../../models/donation';
import { Usuario } from '../../../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Donationservice } from '../../../services/donationservice';
import { ItemService } from '../../../services/itemservice';
import { ItemDTO } from '../../../models/itemDTO';

@Component({
  selector: 'app-donation-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './donation-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './donation-insert.css',
})
export class DonationInsert implements OnInit {

  form: FormGroup = new FormGroup({});
  donacion: Donation = new Donation();
  listaitems: ItemDTO[] = [];
  listausuarios: Usuario[] = [];

  constructor(

    private dS: Donationservice,
    private iS: ItemService,
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      namedonation: ['',[Validators.required, Validators.maxLength(50)]],
      itemid: ['',Validators.required],
      userid: ['',Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.iS.list().subscribe(data => {
      this.listaitems = data;
      this.cdr.detectChanges();
    });
    this.uS.list().subscribe(data => {
      this.listausuarios = data;
      this.cdr.detectChanges();
    });
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.donacion.nameDonation = this.form.value.namedonation;
    this.donacion.itemId = this.form.value.itemid;
    this.donacion.idUser = this.form.value.userid;

    this.dS.insert(this.donacion).subscribe({
      next: () => {
        this.snackBar.open('Donación registrada con éxito', 'cerrar', {duration: 2000});
        this.router.navigate(['/donations/listar']);
      },
    });
  }
}
