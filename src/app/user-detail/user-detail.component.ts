import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { Firestore, doc, docData} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{

  firestore: Firestore = inject(Firestore);

  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);

  userIdFromUrl: string | null = null;
  userData: User | null = null;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userIdFromUrl = params.get('id');
      console.log(this.userIdFromUrl);
    });
    this.getUserInformation();
  }

  getUserInformation() {
    if (!this.userIdFromUrl) return;

    const userDocRef = doc(this.firestore, 'users', this.userIdFromUrl);

    docData(userDocRef, { idField: 'id' })
    .subscribe((dbData: any) => {
      this.userData = new User(dbData);
      console.log('User loaded:', this.userData);
    });
  }

  editUserDetails(){
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.userData;
  }

  editAddress(){
 this.dialog.open(DialogEditAddressComponent);
  }
}
