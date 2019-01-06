import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { RoleGuard } from '../guards/role-guard.service';
import { ClientsCompResolver } from '../resolvers/clients-comp.service';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        resolve: { pageData: ClientsCompResolver  },
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
      {
        path: 'clients',
        component: ClientsComponent,
        resolve: { pageData: ClientsCompResolver  },
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
    ]
  }
];
