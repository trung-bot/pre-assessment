import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormService } from '../shared/form.service';
import { IAnswer } from '../shared/form.model';

@Pipe({
  standalone: true,
  name: 'ListAnswers'
})
export class ListAnswersPipe implements PipeTransform {
  transform(items: IAnswer[]): any {
      return items.filter(item => item.isSelected).map(x => x.customAnswer ? x.customAnswer : x.content).join(', ');
  }
}

@Component({
  selector: 'app-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrl: './form-answers.component.scss'
})
export class FormAnswersComponent {
  questions = this.formService.questions();
  constructor(
    private formService: FormService
  ) {

  }
}
