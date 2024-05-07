// Angular
import { NgModule } from '@angular/core';

// Modules
import { MaterialModule } from 'src/app/material/material.module';

// Components
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

// Directives
import { UppercaseDirective } from './directives/uppercase.directive';

@NgModule({
  declarations: [Error404PageComponent, UppercaseDirective],
  exports: [Error404PageComponent, UppercaseDirective, MaterialModule],
})
export class SharedModule {}
