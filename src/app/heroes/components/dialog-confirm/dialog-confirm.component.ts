/** Angular */
import { Component, Inject } from '@angular/core';

/** Angular Material */
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/** Interfaces */
import { IntHero } from '../../interfaces';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
})
export class DialogConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IntHero
  ) {}

  //#region -----------------------------------------------------> EVENTS

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  //#endregion
}
