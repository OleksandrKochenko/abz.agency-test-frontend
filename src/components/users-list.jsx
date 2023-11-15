import { MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { UserItem } from './user-item';

export const UsersList = ({ users }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const handleClickOpen = id => {
    setUserId(id);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: '300px 300px 300px',
          margin: 'auto',
          width: '950px',
          gap: 25,
          padding: '20px',
          listStyleType: 'none',
        }}
      >
        {users.map(el => (
          <li key={el._id}>
            <Card
              sx={{
                maxWidth: 300,
                backgroundColor: 'lightslategray',
                color: 'white',
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={el.photo}
                    alt={el.name}
                    sx={{ width: 56, height: 56 }}
                  />
                }
                title={el.name}
                subheader={el.position}
                action={
                  <IconButton onClick={() => handleClickOpen(el._id)}>
                    <MoreVert />
                  </IconButton>
                }
              />
              <CardContent>
                <p>{el.email}</p>
                <p>{el.phone}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <UserItem userId={userId} open={modalOpen} onClose={handleClose} />
    </>
  );
};
