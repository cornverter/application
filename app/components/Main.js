// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Main.scss';
import File from './UI/File';
import ButtonFile from './UI/ButtonFile';
import FileDrop from './UI/FileDrop';
import Header from './UI/Header';
import Cornvert from './../libs/ffmpeg'

// const fixPath = require('fix-path');
// fixPath();

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
          fileObject = new Cornvert(file.path),
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
      <div className={styles.app}>
        <Header />
        <FileDrop className={styles.list} onDrop={console.log}>
          <File name="VIDEO_7291VIDEO_7291VIDEO_7291.MOV" progress={0} />
          <File name="VIDEO_7291.MOV" progress={100} />
          <File name="video.MOV" progress={50} />
          {this.state.files.map(file => (
            <File name={file.name} />
          ))}
        </FileDrop>
        <div className={styles.bar}>
          <ButtonFile className={styles.addFileButton}>+ add file</ButtonFile>
          <select className={styles.format}>
            {['avi', 'mp4', 'flv', 'ogg', 'mkv'].map(f => (
              <option value={f}>{f}</option>
            ))}
          </select>
          <button className={styles.convertButton}>Convert</button>
        </div>
      </div>
    );
  }
}
