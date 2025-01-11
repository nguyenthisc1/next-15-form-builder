export type Field = {
    type: string
    name: string
    label: string
    placeholder: string
    options?: string[]
}

export type JsonForm = {
    title: string
    subHeading: string
    submit: string
    fields: Field[]
}

export type Controller = {
    theme: string
    background: string
    styles: any
}

export type Form = {
    id: number
    jsonform: JsonForm
    theme: Controller['theme']
    background: Controller['background']
    styles: Controller['styles']
}
