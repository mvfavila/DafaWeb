import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../guards/auth-guard.service';
import { RoleGuard } from '../guards/role-guard.service';
import { HomeComponent } from './home/home.component';
import {
  MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule,
  MatRadioModule, MatSlideToggleModule, MatSnackBarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTransferService } from './data-transfer.service';

@NgModule({
  declarations: [
    LayoutComponent,
    AdminComponent,
    HomeComponent,
    ClientsComponent,
    ClientComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    DataTransferService
  ],
  entryComponents: [
    ClientComponent,
  ]
})
export class DashboardModule { }
