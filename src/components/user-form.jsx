import { Dialog, LinearProgress } from '@mui/material';
import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { addUser, fetchPositions, fetchToken } from 'services/api';

Notiflix.Notify.init({
  position: 'center-top',
  timeout: 4000,
});

export const UserForm = ({ open, onClose }) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchToken();
      setToken(data.token);
    };
    const getPositions = async () => {
      const data = await fetchPositions();
      setPositions(data.positions);
    };
    getData();
    getPositions();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (e.target.position_id.value === 'select a position') {
      Notiflix.Notify.warning('select proper position');
      return;
    }
    setIsLoading(true);
    const file = e.target.photo.files[0];
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const position_id = e.target.position_id.value;
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('position_id', position_id);

    const data = await addUser(token, formData);

    setIsLoading(false);
    onClose();

    Notiflix.Notify.success(
      `User with id ${data.user_id} successfully registered`
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div
        style={{
          padding: 10,
          backgroundColor: 'slategray',
          color: 'white',
        }}
      >
        {isLoading && <LinearProgress />}
        <h3 style={{ textAlign: 'center' }}>
          By open this modal, you have got a registration token!
        </h3>
        <form
          method="post"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            style={{
              height: '30px',
              border: '1px solid black',
              borderRadius: '5px',
              margin: '5px',
            }}
            type="text"
            name="name"
            placeholder="name"
          />{' '}
          <br />
          <input
            style={{
              height: '30px',
              border: '1px solid black',
              borderRadius: '5px',
              margin: '5px',
            }}
            type="email"
            name="email"
            placeholder="email"
          />
          <br />
          <input
            style={{
              height: '30px',
              border: '1px solid black',
              borderRadius: '5px',
              margin: '5px',
            }}
            type="text"
            name="phone"
            placeholder="phone"
          />
          <br />
          <input
            style={{
              height: '30px',
              border: '1px solid black',
              borderRadius: '5px',
              margin: '5px',
            }}
            type="password"
            name="password"
            placeholder="password"
          />
          <br />
          <select
            style={{
              height: '30px',
              border: '1px solid black',
              borderRadius: '5px',
              margin: '5px',
            }}
            name="position_id"
          >
            <option key="placeholder" value="select a position">
              select a position
            </option>
            {positions.map(el => (
              <option key={el._id} value={el._id}>
                {el.title}
              </option>
            ))}
          </select>
          <br />
          <input style={{ margin: '5px' }} type="file" name="photo" />
          <br />
          <input
            style={{
              height: '30px',
              border: '1px solid black',
              borderRadius: '5px',
              backgroundColor: 'skyblue',
              margin: '5px',
            }}
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </Dialog>
  );
};
