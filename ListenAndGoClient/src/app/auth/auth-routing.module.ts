import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoggedOutGuard } from './logged-out.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent, canActivate: [LoggedOutGuard] },
  { path: 'register', component: AuthComponent, canActivate: [LoggedOutGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
