// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from 'src/app/material/material.module';

// Components
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { LoadingComponent } from './components/loading/loading.component';

// Directives
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [Error404PageComponent, LoadingComponent, UppercaseDirective],
  imports: [CommonModule],
  exports: [
    Error404PageComponent,
    LoadingComponent,
    UppercaseDirective,
    MaterialModule,
  ],
})
export class SharedModule {}
