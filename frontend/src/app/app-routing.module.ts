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
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {AuthGuard} from './guards/auth.guard';
import {RoleGuard} from './guards/role.guard';
import {AdminStatisticsComponent} from './admin-dashboard/admin-statistics/admin-statistics.component';

const routes: Routes = [
  // PUBLIC ROUTES
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  // TEACHER ONLY
  {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['teacher']}},
  {path: 'dashboard/createClass', component: CreateClassComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['teacher']}},
  {path: 'dashboard/editClass/:classId', component: EditClassComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['teacher']}},
  {path: 'dashboard/createStudent', component: CreateStudentComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['teacher']}},
  {path: 'dashboard/editStudent/:studentId', component: EditStudentComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['teacher']}}, // pass id as param
  {path: 'admin-statistics', component: AdminStatisticsComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['teacher']}},
  {path: 'admin-statistics/:studentId', component: AdminStatisticsComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['teacher']}},

  // STUDENT ONLY
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['teacher', 'student']}},
  {path: 'achievements', component: AchievementsComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['student']}},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['student']}},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['student']}},
  {path: 'level/:id', component: LevelComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['student']}},
  {path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: ['student']}},

  // PUBLIC WILDCARD
  {path: '**', redirectTo: '', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true, enableViewTransitions: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
