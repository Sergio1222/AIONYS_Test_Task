import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import { Trans, useTranslation} from 'react-i18next';
import { ApplicationState } from '../../store'
import * as NotesStore from '../../store/Notes'
import { NoteForm } from './NoteForm'
import i18n from '../../i18n';
 


const Notes = () => {

    const changeLanguage = (lng: string) =>  {
        dispatch(NotesStore.ChangeLanguage(lng));
        i18n.changeLanguage(lng);   
    };
    
    const NotesData = useSelector<ApplicationState, NotesStore.NotesState>(state => state.Notes);

    const dispatch = useDispatch();

    const [currentId, setCurrentId] = React.useState<number>(0)

    React.useEffect(() => {
        dispatch(NotesStore.GetAll())
    }, [])

    //React.useEffect(()=>{
    //    i18n.changeLanguage(NotesData.selectedLanguage)
    //},[NotesData.selectedLanguage]);
    const { addToast} = useToasts()

    const onDelete = (id: number) => {
            dispatch(NotesStore.Delete(id,
                ()=> addToast(<Trans i18nKey="deleted"></Trans>, { appearance: 'info' })))
    }

    return (
        <Paper elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <NoteForm {...({currentId, setCurrentId})}/>
                    <p></p>
                    <button onClick={() => changeLanguage('ru')}>ру</button>
                    <button onClick={() => changeLanguage('en')}>en</button>
                    <button onClick={() => changeLanguage('ua')}>укр</button>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>  
                                        <TableCell><Trans i18nKey="description"></Trans></TableCell>
                                        <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    NotesData.Notes.map((Note, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{Note.description}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(Note.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(Note.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Notes;