import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', 
      loadChildren: './home/home.module#HomePageModule' },
  { path: 'new-user', 
      loadChildren: './new-user/new-user.module#NewUserPageModule' },
  { path: 'returning-user', 
      loadChildren: './returning-user/returning-user.module#ReturningUserPageModule' },
  { path: 'admin', 
      loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'user-tech-profile/:userId', 
      loadChildren: './user-tech-profile/user-tech-profile.module#UserTechProfilePageModule' },
  { path: 'user-tech-profile/:userId/past',
      loadChildren: './user-tech-profile/past/past.module#PastPageModule' },
  { path: 'user-tech-profile/:userId/present',
      loadChildren: './user-tech-profile/present/present.module#PresentPageModule' },
  { path: 'line-item-action-page/:userId/:lineItemId/:idx', 
      loadChildren: './line-item-action-page/line-item-action-page.module#LineItemActionPagePageModule' },
  { path: 'line-item-level-content-page/:userId/:lineItemId/:idx', 
      loadChildren: './line-item-level-content-page/line-item-level-content-page.module#LineItemLevelContentPagePageModule' },
  { path: 'user-question-detail/:userId/:questionId', 
      loadChildren: './user-question-detail/user-question-detail.module#UserQuestionDetailPageModule' },
  { path: 'question-list/:lineItemId/:level', 
      loadChildren: './admin/question-list/question-list.module#QuestionListPageModule' },
  { path: 'question-list', 
      loadChildren: './admin/question-list/question-list.module#QuestionListPageModule' },
  { path: 'question-display/:questionId',
      loadChildren: './admin/question-display/question-display.module#QuestionDisplayPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
