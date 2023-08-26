import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MaterialModule } from '../material/material/material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, DialogComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, PageNotFoundComponent, DialogComponent],
})
export class CommonComponentModule {}
