import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { Observable } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    RouterLink
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent {
  firestore: Firestore = inject(Firestore);

  allUsers$: Observable<User[]>;

  constructor(public dialog: MatDialog) {

    const usersRef = collection(this.firestore, 'users');

    this.allUsers$ = collectionData(usersRef, {
      idField: 'id'
    }) as Observable<User[]>;

    // this.allUsers$.subscribe(users => {
    //   users.forEach(user => { 
    //     console.log(user);
    //   });
    // }); 
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }
}
