/** Angular */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Components */
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

// Constants
import { APP } from './constants/app.constant';

const {
  PAGES: {
    Root: { children },
  },
} = APP;
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: children.NewHero,
        component: NewPageComponent,
      },
      {
        path: children.Edit,
        component: NewPageComponent,
      },
      {
        path: children.List,
        component: ListPageComponent,
      },
      {
        path: children.Hero,
        component: HeroPageComponent,
      },
      {
        path: children.Search,
        component: SearchPageComponent,
      },
      {
        path: '**',
        redirectTo: children.List,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
