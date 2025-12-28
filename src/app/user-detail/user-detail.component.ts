import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { Firestore, doc, docData} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{

  firestore: Firestore = inject(Firestore);

  route = inject(ActivatedRoute);

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
}
