import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogContent, MatDialogRef, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Firestore, doc, updateDoc, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    FormsModule,
    MatProgressSpinnerModule,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  loading = false;
  user!: User;
  timestamp = Date;
  dialogRef = inject(MatDialogRef);
  firestore: Firestore = inject(Firestore);

   async saveUpdatedAddress() {
    if (!this.user?.id) {
      console.error('User ID missing');
      return;
    }
    this.loading = true;

    try {
      const userDocRef = doc(this.firestore, 'users', this.user.id);
   
      await updateDoc(userDocRef, this.user.toJSON());

      this.dialogRef.close(true);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      this.loading = false;
    }
  }
}
