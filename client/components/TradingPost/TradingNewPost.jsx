import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import TradeNewPhoto from './TradeNewPhoto.jsx';


const TradingNewPost = ({ userId }) => {

  const navigate = useNavigate();

  const [postImg, setPostImg] = useState(null);
  const [user, setUser] = useState(null);


  const [postTexts, setPostTexts]
  = useState({ title: '', location: '', description: '', price: '' });

  const handlePostInput = (e) => {
    const { name, value } = e.target;
    setPostTexts((postTexts) => {
      return { ...postTexts, [name]: value, };
    });
    // console.log(postTexts)
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPost = {
        ...postTexts,
      };

      await axios.post('/trading', newPost);
      console.log('Submitted New Post!');

      // Reset the form instead of refreshing the page
      setPostTexts({
        title: '',
        location: '',
        description: '',
        price: '',
      });
    } catch (error) {
      console.error("Could not submit new post", error);
    }
  }


  const getUserObj = () => {
    axios.get("/user").then((response) => {
      const user = response.data;
      console.log(user);
      setUser(user);
    })
    .catch((error) => {
      console.log("Need to be signed in to create a post!");
      navigate('/login');
    })
  }

  useEffect (() => {
    getUserObj();

  }, [])



  return (
    <div className="new-trading-post">
      <form className="box" onSubmit={ handlePostSubmit }>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              placeholder="Title"
              className="card"
              value={ postTexts.title }
              onChange={ handlePostInput }
              name="title"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Meetup Location</label>
          <div className="control">
            <input
              type="text"
              placeholder="Meetup Location"
              className="card"
              value={ postTexts.location }
              onChange={ handlePostInput }
              name="location"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <h8>$ </h8>
            <input
              type="text"
              placeholder="Price"
              className="card"
              value={ postTexts.price }
              onChange={ handlePostInput }
              name="price"
            />
          </div>
        </div>

        <div className="field">
  <label className="label">Description</label>
  <div className="control">
    <div style={{ display: "flex" }}>
      <input
        type="image"
        // src=""
        width="80"
        height="60"
        style={{ marginRight: "8px" }}
      />
      <input
        type="text"
        placeholder="Describe Your Goods"
        className="card"
        value={ postTexts.description }
        onChange={ handlePostInput }
        name="description"
        style={{ height: "80px", width: "200px" }}
      />
    </div>
  </div>
</div>


        <input
          type="submit"
          value="Send New Post"
          className="button black-button"
        />
      </form>
    <TradeNewPhoto user={ user }/>
    </div>
  );

}

export default TradingNewPost;