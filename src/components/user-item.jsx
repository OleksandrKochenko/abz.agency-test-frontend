import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchUserById } from 'services/api';

export const UserItem = ({ open, onClose, userId }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const user = await fetchUserById(userId);
      setUserData(user);
    };
    getData();
  }, [userId]);

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ width: 300, height: 150, padding: 10 }}>
        <h3>User fetched by ID</h3>
        <p>name: {userData.name}</p>
        <p>id: {userData._id}</p>
      </div>
    </Dialog>
  );
};
