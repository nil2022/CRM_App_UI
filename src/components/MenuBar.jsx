import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux'

export default function MenuBar({
    buttonItem = [{
        text: 'Option1',
    }],
    menuItem = [{
        text: 'Option1',
        color: 'green',
        backgroundColor: '#d6f5d6',
        menuOnClickFn: () => { }
    }],
}) {

    // const [ticketId, setTicketId] = React.useState(null)
    const userData = useSelector((state) => state.auth?.userData || [])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        // setTicketId(id)

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {buttonItem.map(item => (
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant='text'
                    disabled={userData.userType === 'CUSTOMER' ? true : false}
                >
                    {item.text}
                </Button>))}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {menuItem.map(item => (
                    <MenuItem
                    key={item.text}
                        onClickCapture={item.menuOnClickFn}
                        onClick={handleClose}
                        sx={{
                            color: item.color,
                            '&:hover': {
                                backgroundColor: item.backgroundColor,
                            }
                        }}
                    >
                        {item.text}
                    </MenuItem>))
                }
            </Menu>
        </div>
    );
}