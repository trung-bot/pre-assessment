import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormAddQuestionDialogComponent } from '../form-add-question-dialog/form-add-question-dialog.component';
import { IAnswer, IQuestion } from '../shared/form.model';
import { FormService } from '../shared/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent implements OnInit, AfterViewInit {
  listQuestions: IQuestion[]
  formArr: FormArray;
  formGroup: FormGroup;

  constructor(
    private dialogService: MatDialog,
    private formService: FormService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      arr: new FormArray([])
    })
  }

  ngOnInit(): void {
    this.listQuestions = this.formService.questions();
    this.formArr = this.fb.array([])

    this.listQuestions.forEach(question => {
      if(question.type === 'paragraph') {
        this.formArray.push(this.createParagrapQuestion())
      } else {
        this.formArray.push(this.createSelectionQuestion(question))
      }
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formArray.patchValue(this.listQuestions);
    }, 10);
  }

  get formArray() {
    return this.formGroup.get('arr') as FormArray
  }

  onOpenDialogAddNewQuestion() {
    let dialogRef = this.dialogService.open(FormAddQuestionDialogComponent, {
      height: '80vh',
      width: '600px',
    })
    dialogRef.afterClosed().subscribe((res: IQuestion) => {
      if(res) {
        if(res.type === 'paragraph') {
          this.formArray.push(this.createParagrapQuestion())
        } else {
          this.formArray.push(this.createSelectionQuestion(res))
        }
        this.listQuestions.push(res);
        this.formArray.patchValue(this.listQuestions)
      }
    })
  }

  reviewMyAnswer() {
    this.formGroup.markAllAsTouched();
    if(this.formGroup.invalid) return;
    if(this.formGroup.value) {
      this.formService.setValueForm(this.formGroup.value.arr);
    }
    this.router.navigate(['form/answers']);
  }

  createParagrapQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      answer: '',
      type: ['', Validators.required],
      isRequired: [false, Validators.required],
    },{ validators: [this.validateParagraphQuestion()] });
  }

  createSelectionQuestion(question: IQuestion): FormGroup {
    let arrAnswer = new FormArray([]);
    question.listAnswers.forEach(ans => {
      arrAnswer.push(this.fb.group({
        content: [''],
        isSelected: [''],
        customAnswer: ['']
      }, ))
    })
    return this.fb.group({
      question: '',
      listAnswers: arrAnswer,
      type: [''],
      isRequired: [false],
      allowCustomAnswer: [false],
    }, { validators: [this.validateSelectionQuestion()] });
     
  }

  validateParagraphQuestion(): {[key: string]: any} | null  { // mandatory validation for "paragraph question"
    return (group: FormGroup) => {
      if(group.get('isRequired').value && !group.get('answer').value) {
        group.get('answer').setErrors({required: true})
      } else  {
        group.get('answer').setErrors(null)
      }
      return
    };
  
  }

  validateSelectionQuestion() : {[key: string]: any} | null  { // mandatory validation for "multi selection question"
    return (group: FormGroup) => {
      if(group.get('isRequired').value && !(group.get('listAnswers').value && (<IAnswer[]>group.get('listAnswers').value).findIndex(a => a.isSelected) > -1)) {
        group.get('listAnswers').setErrors({required: true})
      } else  {
        group.get('listAnswers').setErrors(null)
      }
      return
    };
  
  }

  onSelectOther(values: any, control: any) {
    if(values.currentTarget.checked) {
      control.setValidators(Validators.required)
    } else {
      control.setValue(null)
      control.setErrors(null);
      control.clearValidators()
    }
  }

  trackByFn(index: any, item: any) {
    return index;  
  }

}
