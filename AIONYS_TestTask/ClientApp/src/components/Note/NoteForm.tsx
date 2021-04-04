import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";

import { ApplicationState } from '../../store';
import * as NotesStore from '../../store/Notes'
import { Trans } from 'react-i18next';

const ValidateSchema = yup.object().shape({
    description: yup.string().required()
})

type FormType = {
    description: string
}

type PropsType = {
    currentId: number,
    setCurrentId: React.Dispatch<React.SetStateAction<number>>
}

export const NoteForm = (props: PropsType) => {

    const NotesData = useSelector<ApplicationState, NotesStore.NotesState>(state => state.Notes);
    const dispatch = useDispatch();

    const { handleSubmit, errors, register, reset, setValue } = useForm<FormType>({
        resolver: yupResolver(ValidateSchema)
    });
    

    const { addToast } = useToasts()

    const OnSubmit = (values: FormType) => {
        const onSuccess = () => {
            reset(); 
            props.setCurrentId(0)
            addToast(<Trans i18nKey="submitted"></Trans>, { appearance: 'success' })
        }
        if (props.currentId === 0){
            dispatch(NotesStore.Create(values, onSuccess));
        }
        else{
            dispatch(NotesStore.Update(props.currentId, values, onSuccess))
        }
    }

    React.useEffect(() => {
        if (props.currentId !== 0) {
            const currentNote = NotesData.Notes.find(x => x.id === props.currentId);
            setValue("description", currentNote ? currentNote.description : "")
        }
    }, [props.currentId])

    return (
        <form onSubmit={handleSubmit(OnSubmit)}>
            <h1><Trans i18nKey="note"></Trans></h1>
            <div>
                <label><Trans i18nKey="text"></Trans></label>
                <input name="description" ref={register}></input>
                {errors.description && <p><Trans i18nKey="eror"></Trans></p>}
            </div>
            <div><p></p></div>
            <div>
                <Button type="submit" color="primary" variant="contained"
                ><Trans i18nKey="submit"></Trans></Button>
                <Button
                    variant="contained"
                    onClick={() => { reset(); props.setCurrentId(0) }}
                ><Trans i18nKey="reset"></Trans></Button>
            </div>
        </form>)
}

export default NoteForm;