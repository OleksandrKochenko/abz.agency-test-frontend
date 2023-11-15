import { Button, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { fetchUsers } from 'services/api';
import { UsersList } from './users-list';
import { UserForm } from './user-form';

export const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextLink, setNextLink] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleShowUsers = async () => {
    setIsLoading(true);
    const { users, links } = await fetchUsers(nextLink);
    setUsers(prevState => {
      return [...prevState, ...users];
    });
    setNextLink(links.next_url);
    setIsLoading(false);
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Button onClick={handleShowUsers} type="button" variant="contained">
          {users.length > 0 ? 'More users' : 'Show users'}
        </Button>
        <Button onClick={handleOpen} type="button" variant="contained">
          Add user
        </Button>
      </div>
      <div style={{ padding: '5px' }}>{isLoading && <LinearProgress />}</div>
      {users.length > 0 && <UsersList users={users} />}
      <UserForm open={openModal} onClose={handleClose} />
    </div>
  );
};
