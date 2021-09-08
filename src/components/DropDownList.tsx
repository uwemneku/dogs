
import React, { ChangeEvent, ReactNode, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export type dropDownListCallback = (inputName: string, value: string) => void;
interface DropDownListProps {
    /**
     * A string array to be displayed in the dropdown list
     */
    list: string[];
    /**
     * This is used as the name for the Select HTML element
     */
    id: string;
    /**
     * This is displayed when no selection have been made
     */
    name: string;
    /**
    * This function is called when the value of the dropdown changes. The function is passed the event.
    */
    onSelect: dropDownListCallback
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const DropDownList: React.FC<DropDownListProps> = ({ list, id, name, onSelect }) => {
    const classes = useStyles();
    const [selection, setSelection] = useState<unknown>("");

    const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>): void => {
        setSelection(event.target.value);
        //   @ts-ignore: Material UI returns the selected value with a type unknown
        onSelect(event.target.name, event.target.value)
    };


    return (
        <div>
            {
                (list.length > 0)
                &&
                (
                    <FormControl className={classes.formControl} >
                        <InputLabel id={id}>{name}</InputLabel>
                        <Select
                            labelId={id}
                            id={id}
                            name={id}
                            value={selection}
                            onChange={handleChange}
                        >
                            {list.map(x =>
                                <MenuItem key={x} value={x}>{x}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                )
            }
        </div>
    );



}
export default React.memo(DropDownList);
