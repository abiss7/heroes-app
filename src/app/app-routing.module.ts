// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

// Constants
import { APP } from './heroes/constants/app.constant';

const {
  PAGES: { Root },
} = APP;
const routes: Routes = [
  {
    path: Root.Heroes,
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    path: Root[404],
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: Root.Heroes,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: Root[404],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
