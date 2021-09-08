
import React, { ChangeEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export type dropDownListCallback = (inputName: string, value: string) => void;
interface DropDownListProps {
    /**
     * An array of strings to be displayed in the dropdown list
     */
    data: string[];
    /**
     * This the name of the Select HTML element
     */
    id: string;
    /**
     * This is displayed when no selection have been made
     */
    name: string;
    /**
    * This function is called when the value of the dropdown changes.
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
const DropDownList: React.FC<DropDownListProps> = ({data, id, name, onSelect }) => {
    const classes = useStyles();
    const [selection, setSelection] = useState<unknown>("");

    const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>): void => {
        setSelection(event.target.value);
        //   @ts-ignore: Material UI returns the selected value with a type unknown. This ignore statements lets onSelect take that value as a string
        onSelect(event.target.name, event.target.value)
    };


    return (
        <div>
            {
                (data.length > 0)
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
                            {data.map(x =>
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
