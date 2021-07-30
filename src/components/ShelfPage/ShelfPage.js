import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';


function ShelfPage() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const itemReducer = useSelector(store => store.itemListReducer);
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'GET_ITEMS' });
}, []);

  

  const submitItem = () => {
    const itemToSend = {
      description: description,
      image_url: image,
    };
    console.log(itemToSend);
    if (itemToSend.description == '') {
      alert('Please enter an item description');
      return false;
    }
    if (itemToSend.image_url == '') {
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
        <thead>
          <tr>
            <th></th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemReducer.map((item, index) => {
            return ( <tr key={index}>
              <td><img src={item.image_url} /></td>
              <td>{item.description}</td>
              {
                ( user.id === item.user_id) ?
                <td><button onClick={() => dispatch({ type: 'DELETE_YOUR_ITEM', payload: item.id})}>Delete</button></td> :
                <td><button disabled>Delete</button></td>
              }
              {/* if( user.id === item.user_id) {
                <td><button onClick={dispatch({ type: 'DELETE_YOUR_ITEM', payload: item.id})}></button></td>
                } */}
            </tr>
              )
          })}
        </tbody>

        


      </table>
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
