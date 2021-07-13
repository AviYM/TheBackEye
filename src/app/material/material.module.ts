import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...materialModules],
  exports: materialModules,
})
export class MaterialModule {}
