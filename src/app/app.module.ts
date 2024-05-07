// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared/shared.module';
import { HeroesModule } from './heroes/heroes.module';

// Interceptors
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HeroesModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    { provide: 'REQUEST_DELAY', useValue: 500 },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
