import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';

const routes: Routes = [{ path: '', component: ContactUsComponent }];

@NgModule({
  declarations: [ContactUsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ContactUsModule {}
