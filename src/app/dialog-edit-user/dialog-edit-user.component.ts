import { Component, inject, OnInit } from '@angular/core';
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
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
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
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  loading = false;
  user!: User;
  timestamp!: Date;
  firestore = inject(Firestore);
  dialogRef = inject(MatDialogRef<DialogEditUserComponent>);

  ngOnInit(): void { 
    if (this.user?.birthDate) {   
      this.timestamp = new Date(this.user.birthDate);
      // shows Date correct in Datepicker
    }
  }
  async saveUpdatedUser() {
    if (!this.user?.id) {
      console.error('User ID missing');
      return;
    }

    this.loading = true;

    try {
      this.user.birthDate = this.timestamp
        ? this.timestamp.getTime()
        : this.user.birthDate;

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