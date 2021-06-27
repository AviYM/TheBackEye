import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const componentList = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
];

@NgModule({
  declarations: [
    componentList,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    componentList
  ]
})
export class SharedModule { }
