import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  user = new User();

  dateAsTimestamp: Date = new Date();


  saveUser(){
    this.user.birthDate = this.dateAsTimestamp.getTime();
    console.log('Current User is', this.user.birthDate);
    
  }

  closeDialog(){
    
  }
}
