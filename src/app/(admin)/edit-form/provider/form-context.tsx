'use client'

import { type Controller, type Form } from '@/lib/types'
import { createContext, type Dispatch, type ReactNode, useContext, useReducer } from 'react'

interface State {
    controller: Controller
    form: Form
}

// Define action types
enum ActionTypes {
    UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD',
    UPDATE_FORM_CONTROLLER = 'UPDATE_FORM_CONTROLLER'
}

type Action = { type: ActionTypes.UPDATE_FORM_FIELD; payload: { field: any; index: number } } |

{
    type: ActionTypes.UPDATE_FORM_CONTROLLER; payload: {
        themeScheme: string,
        theme: string,
        background: string
    }
}

// Reducer function
const formReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.UPDATE_FORM_FIELD:
            const { jsonform: form } = state.form

            const updatedFields = form.fields.map((field: any, index: number) => (index === action.payload.index ? { ...action.payload.field } : field))

            return {
                ...state,
                form: {
                    ...state.form,
                    jsonform: {
                        ...state.form.jsonform,
                        fields: updatedFields,
                    },
                },
            }
        case ActionTypes.UPDATE_FORM_CONTROLLER:

            return {
                ...state,
                controller: {
                    ...action.payload,
                }

            }
    }
}

// Context interfaces
interface FormContextProps {
    state: State
    dispatch: Dispatch<Action>
}

// Create context
const FormContext = createContext<FormContextProps | undefined>(undefined)

// Provider component
interface FormProviderProps {
    initialData: State
    children: ReactNode
}

export const FormProvider: React.FC<FormProviderProps> = ({ initialData, children }) => {
    const [state, dispatch] = useReducer(formReducer, {
        ...initialData, controller: {
            themeScheme: 'light',
            theme: 'wireframe',
            background: 'None'
        }
    })

    return <FormContext.Provider value={{ state, dispatch }}> {children}</FormContext.Provider >
}

// Custom hook to use the context
export const useFormContext = (): FormContextProps => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider')
    }
    return context
}

export { ActionTypes }
