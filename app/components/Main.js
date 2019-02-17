// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Main.scss';
import File from './UI/File';
import Header from './UI/Header';
// const fixPath = require('fix-path');
// fixPath();


export default class Home extends Component<Props> {
  props: Props;

  state = {
    files: []
  }

  handleChange(e){
    console.log(e.target.files);
    this.setState({files: [{ name: e.target.files[0].name }]});
   // this.setState({
   //    files: e.target.files.map(f => {
   //      name = f.name;
   //    })
   //  });
  }

  render() {

    return (
      <div className={styles.container}>
        <Header />
        <div>
          <File name="VIDEO_7291.MOV" />
          <File name="video.MOV" />
          {this.state.files.map(file => (
            <File name={file.name} />
          ))}
        </div>
        <input type="file" onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}
