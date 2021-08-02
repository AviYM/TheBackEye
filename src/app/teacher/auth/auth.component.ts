import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/shared/services/log/log.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isSignIn: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isSignIn = true;
  }

  toggleForm(): void {
    this.isSignIn = !this.isSignIn;
  }
}
