import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]),
  ],
}).catch(err => console.error(err));
