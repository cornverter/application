// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Main.scss';
import File from './UI/File';
import Header from './UI/Header';
import Cornvector from './../libs/ffmpeg.js';
// const fixPath = require('fix-path');
// fixPath();

class FFmpeg {
  constructor(){
    setTimeout(() => {
      this.name = "hue " + Math.random()*100;
      this.oninfo();
    }, 1000);
    setTimeout(() => {
      let value = Math.random()*100;
      this.onprogress({
        value
      });
    }, 2000);
  }
}

export default class Home extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
  }

  state = {
    files: []
  }

  handleInfo(){
    let files = this.state.files;

    this.setState({ files });
  }

  handleProgress(key, progressObject){
    let files = this.state.files,
        file = files[key];

    file.progress = progressObject.value;

    this.setState({
      files
    });
  }

  handleError(key, error){

  }

  handleDone(key, doneObject){

  }

  handleChange(e){
    let files = e.target.files,
        filesLength = files.length,
        filesArray = this.state.files;

    for (let i = 0; i < filesLength; i++) {
      let file = files[i],
          fileObject = new Cornvector(file.path),
          fileKey = filesArray.push(fileObject) - 1;

      fileObject.key = fileKey;
      fileObject.name = file.name;

      fileObject.oninfo = this.handleInfo;
      fileObject.onprogress = this.handleProgress.bind(this, fileKey);
      fileObject.onerror = this.handleError.bind(this, fileKey);
      fileObject.ondone = this.handleDone.bind(this, fileKey);
    }

    this.setState({
      files: filesArray
    });
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
        <input type="file" multiple onChange={this.handleChange}/>
      </div>
    );
  }
}
