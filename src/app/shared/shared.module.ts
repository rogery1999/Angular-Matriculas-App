import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, FooterComponent],
})
export class SharedModule {}
