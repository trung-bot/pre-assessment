export interface IQuestion {
    question: string, 
    isRequired: boolean, 
    type: 'selection' | 'paragraph', 
    answer?: string, 
    allowCustomAnswer?: boolean, 
    listAnswers?: IAnswer[]
}

export interface IAnswer {
    content: string, 
    isSelected: boolean
    customAnswer?: string
}