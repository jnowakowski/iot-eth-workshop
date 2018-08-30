import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Web3Service} from './web3.service';
import {AddressPipe} from './address.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddressPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [Web3Service, AddressPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
