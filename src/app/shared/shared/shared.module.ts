// Angular
import { NgModule } from '@angular/core';

// Modules
import { MaterialModule } from 'src/app/material/material.module';

// Components
import { Error404PageComponent } from '../pages/error404-page/error404-page.component';

@NgModule({
  declarations: [Error404PageComponent],
  exports: [Error404PageComponent, MaterialModule],
})
export class SharedModule {}
