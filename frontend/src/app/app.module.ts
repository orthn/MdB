import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule} from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {EditStudentComponent} from './admin-dashboard/edit-student/edit-student.component';
import {CreateStudentComponent} from './admin-dashboard/create-student/create-student.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditClassComponent} from './admin-dashboard/edit-class/edit-class.component';
import {CreateClassComponent} from './admin-dashboard/create-class/create-class.component';
import {ToastrModule} from 'ngx-toastr';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AchievementsComponent} from './achievements/achievements.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {SettingsComponent} from './settings/settings.component';
import {LevelComponent} from './level/level.component';
import {CodeEditorComponent} from "./editors/code-editor/code-editor.component";
import {BlockEditorComponent} from './editors/block-editor/block-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminDashboardComponent,
    CreateStudentComponent,
    EditStudentComponent,
    CreateClassComponent,
    EditClassComponent,
    HomeComponent,
    AchievementsComponent,
    StatisticsComponent,
    SettingsComponent,
    LevelComponent,
    NavbarComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    }),
    CodeEditorComponent,
    BlockEditorComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    BreadcrumbComponent
  ]
})
export class AppModule {}
