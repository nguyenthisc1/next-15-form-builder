import React from 'react'

type Props = {
    jsonForm: any
}

const FormUI = ({ jsonForm }: Props) => {

    return (
        <div>
            <h2>{jsonForm?.formTitle}</h2>
            <h2>{jsonForm?.formHeading}</h2>
        </div>
    )
}

export default FormUI
