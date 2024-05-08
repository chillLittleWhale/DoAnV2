import { Routes } from '@angular/router';
import { LogInComponent } from './Pages/log-in/log-in.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { HomeComponent } from './Pages/home/home.component';
import { FollowComponent } from './Pages/follow/follow.component';

export const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'home', component: HomeComponent },
    { path: 'follow', component: FollowComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
