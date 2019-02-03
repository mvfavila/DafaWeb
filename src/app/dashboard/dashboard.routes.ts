import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { RoleGuard } from '../guards/role-guard.service';
import { ClientsCompResolver } from '../resolvers/clients-comp.service';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import { EventWarningsFieldsCompResolver } from '../resolvers/event-warnings-fields-comp.service';
import { EventWarningsComponent } from './event-warnings/event-warnings.component';
import { EventWarningComponent } from './event-warning/event-warning.component';
import { FieldComponent } from './field/field.component';
import { FieldsComponent } from './fields/fields.component';
import { FieldsCompResolver } from '../resolvers/fields-comp.service';

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
        resolve: { clientsData: ClientsCompResolver, eventWarningsData: EventWarningsFieldsCompResolver },
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
        resolve: { fieldsData: FieldsCompResolver  },
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
      {
        path: 'clients',
        component: ClientsComponent,
        resolve: { clientsData: ClientsCompResolver  },
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
      {
        path: 'eventWarnings',
        component: EventWarningsComponent,
        resolve: { eventWarningsData: EventWarningsFieldsCompResolver  },
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
      {
        path: 'eventWarning',
        component: EventWarningComponent,
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
      {
        path: 'field',
        component: FieldComponent,
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
      {
        path: 'fields',
        component: FieldsComponent,
        resolve: { fieldsData: FieldsCompResolver  },
        canActivate: [RoleGuard],
        data: { roles: ['basic'] }
      },
    ]
  }
];
