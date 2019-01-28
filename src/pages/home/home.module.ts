import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    // HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PipesModule
  ],
})
export class HomePageModule {}
