'use client'

import { UpdateFormById } from '@/lib/API/Database/forms/mutations'
import { createContext, type Dispatch, type ReactNode, useContext, useReducer } from 'react'

type Form = any

interface State {
    form: any
}

// Define action types
enum ActionTypes {
    UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD',
}

type Action =
    | { type: ActionTypes.UPDATE_FORM_FIELD; payload: { field: any, index: number } }

// Reducer function
const formReducer = (state: State, action: Action): State => {
    switch (action.type) {

        case ActionTypes.UPDATE_FORM_FIELD:

            const form = state.form.jsonform.form

            const updatedFields = form.fields.map((field: any, index: number) =>
                index === action.payload.index ? { ...action.payload.field } : field
            );

            return {
                ...state,
                form: {
                    ...state.form,
                    jsonform: {
                        ...state.form.jsonform,
                        form: {
                            ...state.form.jsonform.form,
                            fields: updatedFields
                        }
                    }
                }
            };

        default:
            return state
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
    initialData: Form
    children: ReactNode
}

export const FormProvider: React.FC<FormProviderProps> = ({ initialData, children }) => {
    const [state, dispatch] = useReducer(formReducer, initialData);

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
};

// Custom hook to use the context
export const useFormContext = (): FormContextProps => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider')
    }
    return context
}

export { ActionTypes }
