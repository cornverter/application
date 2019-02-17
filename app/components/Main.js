// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Main.scss';
import File from './UI/File';
import Header from './UI/Header';
import Cornvert from './../libs/ffmpeg'
// const fixPath = require('fix-path');
// fixPath();




//=========


export default class Home extends Component<Props> {
  props: Props;

  state = {
    files: []
  }

  // var files = [];

  handleChange(e){
    console.log(e.target.files);
    this.setState({files: [{ name: e.target.files[0].name }]});

    
    for(var i=0; i<e.target.files.length; i++){

      var file = new Cornvert(e.target.files[0].path, {format: 'mp4'});
      // file.options = {format: 'mp4'}
      file.oninfo = function(){
        console.log(this.type);
        console.log(this.resolution.join('×'));

      }
      file.ondone = function(){
        console.log('done!');
      }
      file.onprogress = function(progress){
        console.log('progress: ', progress.value);
      }

      file.start();

      this.setState({files: [ ...this.state.files, file]});
    }

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
