import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IQuestion } from '../shared/form.model';

@Component({
  selector: 'app-form-add-question-dialog',
  templateUrl: './form-add-question-dialog.component.html',
  styleUrl: './form-add-question-dialog.component.scss'
})
export class FormAddQuestionDialogComponent implements OnInit, AfterViewInit {

  questionForm: FormGroup;

  get answers() {
    return this.questionForm.controls["listAnswers"] as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormAddQuestionDialogComponent>,) {
     
  }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      type: ['', Validators.required],
      isRequired: [false, Validators.required],

      allowCustomAnswer: [false, Validators.required],
      listAnswers: this.fb.array([this.fb.group({
        content: ['', Validators.required],
      })])
    });

    this.questionForm.controls['type'].valueChanges.subscribe(type => {
      if(type === 'paragraph') {
        this.questionForm.controls['allowCustomAnswer'].disable()
        this.questionForm.controls['listAnswers'].disable()
      } else {
        this.questionForm.controls['allowCustomAnswer'].enable()
        this.questionForm.controls['listAnswers'].enable()
      }
    })
  }

  ngAfterViewInit(): void {
    this.questionForm.controls['type'].setValue('paragraph')
  }

  addAnswer() {
    if(this.answers.length < 5) {
      const answer = this.fb.group({
        content: ['', Validators.required],
      });
      this.answers.push(answer);
    } else {
      alert('You can not add more than 5 answers');
      return
    }
  }

  onQuestionTypeChanges(value: string) {
    if(value === 'CheckboxList') {
      this.questionForm.controls['Answers'].enable({emitEvent: false});
    }
  }

  removeAnswer(i: number) {
    this.answers.removeAt(i);
  }

  onClose() {
    this.dialogRef.close();
  }
  onSubmit() {
    if(this.questionForm.valid) {
      let result: IQuestion = this.questionForm.value;
      if(result.type === 'selection') {
        result.listAnswers.push({
          content: 'Other',
          isSelected: false
        })
      }
      this.dialogRef.close(result);
    }
  }
}
