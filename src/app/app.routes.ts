import { RouterModule,Routes } from '@angular/router';
import { Home } from './home/home';
import { SavedCities } from './saved-cities/saved-cities';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', component: Home},
    {path: 'saved', component: SavedCities}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule {}