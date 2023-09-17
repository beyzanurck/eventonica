import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


export default function UpdateEvent({ show, event, onClose, onUpdate }) {

  const [editedEvent, setEditedEvent] = useState({
    title: event.title,
    location: event.location,
    eventtime: new Date(event.eventtime),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(editedEvent, event.id);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEditedEvent((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <Modal show={show} onHide={onClose}>

      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="form-newEvent" onSubmit={handleSubmit}>
          <input
            className="input-newEvent"
            name="title"
            onChange={handleChange}
            value={editedEvent.title}
            placeholder="Title"
          />
          <input
            className="input-newEvent"
            name="location"
            onChange={handleChange}
            value={editedEvent.location}
            placeholder="Location"
          />
          <DatePicker
            className="date"
            name="eventtime"
            selected={editedEvent.eventtime}
            onChange={(date) =>
              setEditedEvent({ ...editedEvent, eventtime: date })
            }
            placeholderText="Select Date"
            showTimeSelect
            dateFormat="MMMM d, yyyy"
          />
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>

    </Modal>
  );
}

