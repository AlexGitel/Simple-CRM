import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  constructor(private dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  user = new User();
  timestamp: Date = new Date();
  loading = false;

  saveUser(){
    this.user.birthDate = this.timestamp.getTime();
   
    const collRef = collection(this.firestore, 'users');
    this.loading = true;

    addDoc(collRef, this.user.toJSON())
      .then(() => {
        console.log('User successfully saved', collRef);
        this.loading = false;
      })
      .catch(err => {
        console.error('Error by saving user', err);
    }); 
    this.dialogRef.close();
  }

  closeDialog(){
    
  }
}
