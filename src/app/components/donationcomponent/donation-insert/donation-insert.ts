import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';

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
export class DonationInsert {

}
