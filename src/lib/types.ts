export type Form = {
    id: number
    jsonform: {
        title: string
        subHeading: string
        fields: {
            type: string
            name: string
            label: string
            placeholder: string
            options?: string[]
        }[]
    }
}

export type Controller = {
    themeScheme: string,
    theme: string,
    background: string
}