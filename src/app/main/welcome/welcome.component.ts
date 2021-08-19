import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  bgImgSrc: string = '../../../assets/images/image_bg.png';
  mainTitle: string = 'Welcome to the Back eye';
  subtitle: string = 'Start controlling and improving your teaching';

  constructor() { }

  ngOnInit(): void {
  }

}
