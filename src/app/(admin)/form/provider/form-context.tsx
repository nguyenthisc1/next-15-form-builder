'use client'

import { type Controller, type Form } from '@/lib/types'
import { createContext, type FC, type ReactNode, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react'

interface State {
    status?: 'preview' | 'edit'
    controller: Controller
    form: {
        id: Form['id']
        jsonform: Form['jsonform']
    }
}

type Dispatch = (action: Action) => State

// Define action types
enum ActionTypes {
    UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD',
    DELETE_FORM_FIELD = 'DELETE_FORM_FIELD',
    UPDATE_FORM_CONTROLLER = 'UPDATE_FORM_CONTROLLER',
    SWITCH_FORM_STATUS = 'SWITCH_FORM_STATUS',
}

type Action =
    | { type: ActionTypes.UPDATE_FORM_FIELD; payload: { key: string; field?: any; index?: number } }
    | { type: ActionTypes.DELETE_FORM_FIELD; payload: { key: string; index?: number } }
    | {
          type: ActionTypes.UPDATE_FORM_CONTROLLER
          payload: {
              column: keyof Controller
              value: string
          }
      }
    | {
          type: ActionTypes.SWITCH_FORM_STATUS
          payload: { status: State['status'] }
      }

// Reducer function
const formReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.UPDATE_FORM_FIELD:
            console.log('🚀 ~ formReducer ~ action:', action)
            const { jsonform: form } = state.form

            // Update the field at the specified index by mapping through fields array
            // If index matches, return new field object, otherwise return existing field
            const updatedFields = form.fields.map((field: any, index: number) => (index === action.payload.index ? { ...action.payload.field } : field))

            // Return updated state with new fields and form data
            // Spread existing state and form data
            // Update jsonform with new field label and updated fields array
            return {
                ...state,
                form: {
                    ...state.form,
                    jsonform: {
                        ...state.form.jsonform,
                        [action.payload.key]: action.payload.field?.label,
                        fields: updatedFields,
                    },
                },
            }

        case ActionTypes.DELETE_FORM_FIELD:
            const { jsonform: formToDelete } = state.form

            // Filter out the field at the specified index by creating new array
            // Only include fields where index doesn't match payload index
            const updatedFieldsAfterDelete = formToDelete.fields.filter((_: any, index: number) => index !== action.payload.index)
            // Return updated state with filtered fields array
            // Maintain all other state and form data
            return {
                ...state,
                form: {
                    ...state.form,
                    jsonform: {
                        ...state.form.jsonform,
                        fields: updatedFieldsAfterDelete,
                    },
                },
            }

        case ActionTypes.UPDATE_FORM_CONTROLLER:
            // Extract controller from current state
            const { controller } = state

            // Return updated state with new controller value
            // Update only the specified column with new value
            return {
                ...state,
                controller: {
                    ...controller,
                    [action.payload.column]: action.payload.value,
                },
            }

        case ActionTypes.SWITCH_FORM_STATUS:
            // Return updated state with new status
            // Only update the status field
            return {
                ...state,
                status: action.payload.status,
            }
        default:
            return state
    }
}

interface Store {
    state: State
    dispatch: Dispatch
}

// Create context
const FormContext = createContext<Store | undefined>(undefined)

// Provider component
interface FormProviderProps {
    initialState: State
    children: ReactNode
}

const FormProvider: FC<FormProviderProps> = ({ initialState, children }) => {
    const [state, originalDispatch] = useReducer(formReducer, initialState)

    const stateRef = useRef(state)

    // Update the ref whenever state changes
    useEffect(() => {
        stateRef.current = state
    }, [state])

    const dispatch: Dispatch = useCallback((action) => {
        originalDispatch(action)
        // Calculate and return the updated state immediately
        const updatedState = formReducer(stateRef.current, action)
        stateRef.current = updatedState
        return updatedState
    }, [])

    const store = useMemo(() => ({ state, dispatch }), [state, dispatch])

    return <FormContext.Provider value={store}>{children}</FormContext.Provider>
}

// Custom hook to use the context
const useFormState = () => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider')
    }
    return context
}

export { ActionTypes, FormProvider, useFormState }
