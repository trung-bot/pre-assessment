import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAnswersComponent, ListAnswersPipe } from './form-answers/form-answers.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormAddQuestionDialogComponent } from './form-add-question-dialog/form-add-question-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
const routes: Routes = [
  {
    path: 'builder',
    component: FormBuilderComponent
  },
  {
    path: 'answers',
    component: FormAnswersComponent
  },
  {
    path:'',
    redirectTo: 'builder',
    pathMatch: 'full'
  }
]

@NgModule({
    declarations: [FormBuilderComponent, FormAnswersComponent, FormAddQuestionDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        FlexModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        MatCheckboxModule,
        ListAnswersPipe,
        MatButtonModule,
    ]
})
export class FormModule { }
