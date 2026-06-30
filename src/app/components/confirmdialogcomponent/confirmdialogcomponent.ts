import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  titulo: string;
  mensaje: string;
}

@Component({
  selector: 'app-confirmdialogcomponent',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirmdialogcomponent.html',
  styleUrl: './confirmdialogcomponent.css',
})
export class Confirmdialogcomponent {
  constructor(
    private dialogRef: MatDialogRef<Confirmdialogcomponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  confirmar() {
    this.dialogRef.close(true);
  }
}
