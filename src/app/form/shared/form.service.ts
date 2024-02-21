import { Injectable, signal } from '@angular/core';
import { IQuestion } from './form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  questions = signal<IQuestion[]>([]);
  constructor() { }

  setValueForm(value: IQuestion[]) {
    this.questions.set(value)
  }
}
