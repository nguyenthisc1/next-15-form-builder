'use client'

import { type Controller, type Form } from '@/lib/types'
import { createContext, type Dispatch, type ReactNode, useContext, useReducer } from 'react'

interface State {
    status?: 'preview' | 'edit'
    controller: Controller
    form: {
        id: Form['id']
        jsonform: Form['jsonform']
    }
}

// Define action types
enum ActionTypes {
    UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD',
    UPDATE_FORM_CONTROLLER = 'UPDATE_FORM_CONTROLLER',
}

type Action =
    | { type: ActionTypes.UPDATE_FORM_FIELD; payload: { field: any; index: number } }
    | {
          type: ActionTypes.UPDATE_FORM_CONTROLLER
          payload: {
              column: keyof Controller
              value: string
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
            const { controller } = state

            return {
                ...state,
                controller: {
                    ...controller,
                    [action.payload.column]: action.payload.value,
                },
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
    const [state, dispatch] = useReducer(formReducer, {...initialData, status: 'edit'})

    return <FormContext.Provider value={{ state, dispatch }}> {children}</FormContext.Provider>
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
