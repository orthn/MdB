import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {CreateStudentComponent} from './admin-dashboard/create-student/create-student.component';
import {EditStudentComponent} from './admin-dashboard/edit-student/edit-student.component';
import {CreateClassComponent} from './admin-dashboard/create-class/create-class.component';
import {EditClassComponent} from './admin-dashboard/edit-class/edit-class.component';
import {LoginComponent} from './login/login.component';
import {AchievementsComponent} from './achievements/achievements.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {SettingsComponent} from './settings/settings.component';
import {LevelComponent} from './level/level.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: AdminDashboardComponent},
  {path: 'dashboard/createClass', component: CreateClassComponent},
  {path: 'dashboard/editClass/:classId', component: EditClassComponent},
  {path: 'dashboard', component: AdminDashboardComponent},
  {path: 'dashboard/createStudent', component: CreateStudentComponent},
  {path: 'dashboard/editStudent/:studentId', component: EditStudentComponent}, // pass id as param
  {path: 'login', component: LoginComponent},
  {path: 'achievements', component: AchievementsComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'level/:id', component: LevelComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
