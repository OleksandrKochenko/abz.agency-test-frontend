import {
  //Button,
  Dialog,
  // FormControl,
  // FormLabel,
  // InputLabel,
  // MenuItem,
  // Select,
  // TextField,
  // Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  addUser,
  //fetchPositions,
  fetchToken,
} from 'services/api';

export const UserForm = ({ open, onClose }) => {
  const [token, setToken] = useState('');
  // const [positionId, setPositionId] = useState('');
  // const [positions, setPositions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchToken();
      setToken(data.token);
    };
    // const getPositions = async () => {
    //   const data = await fetchPositions();
    //   setPositions(data.positions);
    // };
    getData();
    //getPositions();
  }, []);

  // const handleChange = e => {
  //   setPositionId(e.target.value);
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    const file = e.target.photo.files[0];
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const position_id = e.target.position_id.value;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('position_id', position_id);

    console.log(file, name, position_id, password, phone, email, token);

    const data = await addUser(token, formData);

    console.log('data', data);
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
        <h2 style={{ textAlign: 'center' }}>
          By open this modal, you have got a registration token!
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="name"
            //onChange={this.handleTopChange}
            //value={this.state.inputTopValue}
          />{' '}
          <br />
          <input
            type="email"
            name="email"
            //onChange={this.handleImageChange}
            //value={this.state.inputImageValue}
          />
          <br />
          <input
            type="text"
            name="phone"
            //onChange={this.handleImageChange}
            //value={this.state.inputImageValue}
          />
          <br />
          <input
            type="password"
            name="password"
            //onChange={this.handleImageChange}
            //value={this.state.inputImageValue}
          />
          <br />
          <input
            type="text"
            name="position_id"
            //onChange={this.handleImageChange}
            //value={this.state.inputImageValue}
          />
          <br />
          <input
            type="file"
            name="photo"
            //onChange={this.handleImageChange}
            //value={this.state.inputImageValue}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
        {/* <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Name"
            size="small"
            type="text"
            name="name"
            placeholder="Name"
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Email"
            size="small"
            type="email"
            name="email"
            placeholder="Email"
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Phone"
            size="small"
            type="text"
            name="phone"
            placeholder="Phone"
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Password"
            size="small"
            type="password"
            name="password"
            placeholder="Password"
            style={{ marginBottom: 10 }}
          />
          <FormControl style={{ marginBottom: 10 }}>
            <InputLabel size="small">Position</InputLabel>
            <Select
              size="small"
              style={{ width: 225 }}
              id="select"
              label="position"
              value={positionId}
              name="position_id"
              onChange={handleChange}
            >
              {positions.map(el => (
                <MenuItem key={el._id} value={el._id}>
                  {el.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            style={{ width: 150, margin: 20 }}
            variant="contained"
            type="submit"
            color="secondary"
          >
            Submit
          </Button>
        </form>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <TextField
            size="small"
            type="file"
            id="photo"
            name="photo"
            style={{ display: 'none' }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ marginBottom: 10 }}
          >
            Upload photo
          </Button>
        </form> */}
      </div>
    </Dialog>
  );
};
