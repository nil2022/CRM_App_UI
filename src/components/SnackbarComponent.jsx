import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({
    setOpenSnackbar = false,
    severity = 'success',
    message = 'This is a Alert inside a Snackbar!'
}) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(setOpenSnackbar);
    }, [setOpenSnackbar])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: 'fit-content', fontWeight: 'semibold' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
