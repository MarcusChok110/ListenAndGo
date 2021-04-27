import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule as CDKLayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LayoutComponent } from './layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from '../core/core.module';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SidenavComponent, LayoutComponent, HeaderComponent],
  imports: [
    CDKLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    ScrollingModule,
    CoreModule,
    MatMenuModule,
    SharedModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}