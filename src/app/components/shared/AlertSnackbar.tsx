import React from "react";
import { Snackbar, Alert } from '@mui/material';

interface SnackbarProps {
    open: boolean, 
    message: string | null, 
    severity?: 'info' | 'success' | 'error', 
    duration?: number,
    onClose: () => void, 
}

const AlertSnackbar = ({ 
    open, 
    message,  
    onClose, 
    severity = 'error',
    duration = 3000 
} : SnackbarProps) => {
    if (!message) return null;
    return (
        <Snackbar
            key={message}
            open={open} 
            autoHideDuration={duration} 
            onClose={onClose} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert variant="filled" onClose={onClose} severity={severity}>
                { message }
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackbar;