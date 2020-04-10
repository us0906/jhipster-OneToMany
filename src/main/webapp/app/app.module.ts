import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Test04SharedModule } from 'app/shared/shared.module';
import { Test04CoreModule } from 'app/core/core.module';
import { Test04AppRoutingModule } from './app-routing.module';
import { Test04HomeModule } from './home/home.module';
import { Test04EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Test04SharedModule,
    Test04CoreModule,
    Test04HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Test04EntityModule,
    Test04AppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class Test04AppModule {}
