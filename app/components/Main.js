// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Main.scss';
import File from './UI/File';
import ButtonFile from './UI/ButtonFile';
import Header from './UI/Header';
import FileDrop from './UI/FileDrop';
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
        {/*<input type="file" onChange={this.handleChange.bind(this)}/>*/}
      </div>
    );
  }
}
