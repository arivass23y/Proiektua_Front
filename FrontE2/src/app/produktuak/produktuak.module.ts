import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduktuakPageRoutingModule } from './produktuak-routing.module';

import { ProduktuakPage } from './produktuak.page';
import { ComponentsModule } from "../components/components.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduktuakPageRoutingModule,
    ComponentsModule,
    TranslateModule
],
  declarations: [ProduktuakPage]
})
export class ProduktuakPageModule {}
