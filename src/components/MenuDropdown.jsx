import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutBtn from './Header/LogoutBtn';
import { useSelector } from 'react-redux'

export default function BasicMenu({ buttonText, children, iconEnabled = true }) {

    const userData = useSelector((state) => state.auth?.userData || [])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {iconEnabled && (<Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="text"

            >
                <AccountCircleIcon sx={{ color: 'white' }} />
            </Button>)}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}
                >
                    <Link to='/dashboard'
                        className='w-full'
                    >
                        Dashboard
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to='/tickets'
                        className='w-full'
                    >
                        View Tickets
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to='/create-ticket'
                        className='w-full'
                    >
                        Add Ticket
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}
                >
                    <Link to='/change-password'
                        className='w-full'
                    >
                        Change Password
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}
                >
                    <div className='w-full'>
                        <LogoutBtn />
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}