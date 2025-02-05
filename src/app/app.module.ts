import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module'; // ✅ Importer AuthModule
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule, // ✅ Ajouter AuthModule pour inclure les composants de Auth
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
