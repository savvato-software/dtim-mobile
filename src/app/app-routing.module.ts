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
  { path: 'user-tech-profile/:candidateId', 
      loadChildren: './user-tech-profile/user-tech-profile.module#UserTechProfilePageModule' },
  { path: 'line-item-action-page/:candidateId/:lineItemId/:idx', 
      loadChildren: './line-item-action-page/line-item-action-page.module#LineItemActionPagePageModule' },
  { path: 'line-item-level-content-page/:candidateId/:lineItemId/:idx', 
      loadChildren: './line-item-level-content-page/line-item-level-content-page.module#LineItemLevelContentPagePageModule' },
  { path: 'candidate-question-detail/:candidateId/:questionId', 
      loadChildren: './candidate-question-detail/candidate-question-detail.module#CandidateQuestionDetailPageModule' },
  { path: 'question-list', 
      loadChildren: './admin/question-list/question-list.module#QuestionListPageModule' },
  { path: 'question-display/:questionId',
      loadChildren: './admin/question-display/question-display.module#QuestionDisplayPageModule' },
  { path: 'question-edit/new', 
      loadChildren: './admin/question-edit/question-edit.module#QuestionEditPageModule' },
  { path: 'question-edit/:questionId', 
      loadChildren: './admin/question-edit/question-edit.module#QuestionEditPageModule' },
  { path: 'tech-profile-edit', 
      loadChildren: './tech-profile-edit/tech-profile-edit.module#TechProfileEditPageModule' },
  { path: 'tech-profile-line-item-edit/:lineItemId', 
      loadChildren: './tech-profile-line-item-edit/tech-profile-line-item-edit.module#TechProfileLineItemEditPageModule' },
  { path: 'tech-profile-topic-edit/:topicId',
      loadChildren: './tech-profile-topic-edit/tech-profile-topic-edit.module#TechProfileTopicEditPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
