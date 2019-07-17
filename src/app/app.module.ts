import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule, routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material";
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule
} from "@angular/material";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MessagesComponent } from "./messages/messages.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RouterModule } from "@angular/router";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ClientsCompResolver } from "./resolvers/clients-comp.service";
import { EventsCompResolver } from "./resolvers/events-comp.service";
import { FieldsCompResolver } from "./resolvers/fields-comp.service";
import { SignInComponent } from "./signin/signin.component";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    MessagesComponent,
    PageNotFoundComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardModule
  ],
  providers: [ClientsCompResolver, EventsCompResolver, FieldsCompResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
