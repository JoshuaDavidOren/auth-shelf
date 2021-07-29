import React, {useState} from 'react';
import { useDispatch} from 'react-redux';


function ShelfPage() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const submitItem = () => {
    const itemToSend = ({
      description: description,
      image: image,
    });
    console.log(itemToSend);
    if (itemToSend.description == '') {
      alert('Please enter an item description');
      return false;
    }
    if (itemToSend.image == '') {
      alert('Please enter an item image URL');
      return false;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: itemToSend
    });
    setDescription('');
    setImage('');
  };
  
  
  return (
    <div className="container">
      <h2>Shelf</h2>
      <div name="submitForm">
      <label>
        Item Description:
        <input type="text" name="descriptionInput" value={description} onChange={(event) => setDescription(event.target.value)}/>
      </label>
      <br />
      <label>
        Item Image URL:
        <input type="text" name="imageInput" value={image} onChange={(event) => setImage(event.target.value)}/>
      </label>
      <br />
     <button onClick={submitItem}>Submit Item</button>
      </div>
      <table>
        <tr>
          <th>//picture</th>
          <th>Description</th>
          <th>Uploaded By</th>
          <th>//deletebutton</th>
        </tr>
        {item.map((item, index) => {
          return ( <tr key={index}>
            <td>{item.image_url}</td>
            <td>{item.description}</td>
            <td>{item.user_id}</td>
            {
              ( user.id === item.user_id) ?
              <td><button onClick={dispatch({ type: 'DELETE_YOUR_ITEM', payload: item.id})}></button></td> :
              <td></td>
            }
            {/* if( user.id === item.user_id) {
               <td><button onClick={dispatch({ type: 'DELETE_YOUR_ITEM', payload: item.id})}></button></td>
              } */}
          </tr>
            )
        })}

        


      </table>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
