// import { useState, useEffect } from "react";
import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
import { storage } from "./firebase";
// import { v4 } from "uuid";

import db from "./firebase"
import { addDoc, collection } from 'firebase/firestore'
// const [imageUpload, setImageUpload] = useState(null);
// const [imageUrls, setImageUrls] = useState([]);

// const imagesListRef = ref(storage, "images/");
export default class Post extends Component {

  
  constructor() {
    super();
    this.state = {
      filePicked: null,
      title: "",
      abstract: "",
      text: "",
      video: "",
      tags: ""
    };
  }

  CreateNewVideo  = async () => {
    var date = new Date()
   
    const collectionRef = collection(db, 'videos');
    const payload = {   title: this.state.title,
    abstract: this.state.abstract,
    text: this.state.text,
    image: this.state.video,
    tags: this.state.tags,
    creationDate: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  }

  await addDoc(collectionRef, payload);

  this.setState({
    filePicked: null,
    title: "",
    abstract: "",
    text: "",
    video: "",
    tags: ""
  });

  console.log('Successfully Added Video');

}

updateInput = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
}

  onFileChange = event => {
    this.setState({ filePicked: event.target.files[0] });
  };

  onFileUpload = () => {
    let videoURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(this.state.filePicked);
    reader.onload = () => {
        videoURL = reader.result;
      this.setState({ video: videoURL });
    };
  };

  // onuploadFile = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrls((prev) => [...prev, url]);
  //     });
  //   });
  // };

  render() {
    return (

      <Form className="SelectedForm">
        <div className="formField">
          <h4 style={{ marginRight: "10px" }}>Title</h4>
          <input value={this.state.title} name="title"  onChange={this.updateInput} placeholder='Enter a descriptive title' />
        </div>

        <div className='imageUploader'>
            <h3>Add Video</h3>
              <input style={{width: "300px", marginRight: "20px", marginLeft: "20px"}}type="file" onChange={this.onFileChange}  />
              <button onClick={this.onFileUpload}>Upload Video</button>
         </div>

        <Form.Field style={{ marginTop: "10px" }}>
          <h4 style={{ marginBottom: "10px" }}>Abstract</h4>
          <textarea value={this.state.abstract} onChange={this.updateInput} name="abstract"  placeholder='Enter a 1 paragraph abstract' />
        </Form.Field>
        <Form.Field style={{ marginTop: "10px" }}>
          <h4 style={{ marginBottom: "10px" }}>Article Text</h4>
          <textarea value={this.state.text} name="text" onChange={this.updateInput} placeholder='Enter the body of your article' />
        </Form.Field>
        <div className="formField">
          <h4 style={{ marginBottom: "10px", marginRight: "10px", marginTop: "10px" }}>Tags</h4>
          <input value={this.state.tags} name="tags"  onChange={this.updateInput} placeholder='Please add up to 3 tags to descript what your article is about e.g., Java' />
        </div>
        <Button style={{ marginTop: "20px", float: "right", width: "170px" }} onClick={this.CreateNewArticle}>Post</Button>
      </Form>



    )
  }
}