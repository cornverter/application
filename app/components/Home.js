// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
const fixPath = require('fix-path');
//console.log(process.env.PATH);
fixPath();
//console.log(process.env.PATH);
const bin = require("ffmpeg-static");
const { spawn } = require('child_process');

export default class Home extends Component<Props> {
  props: Props;
  hue(e){
  	const filename = e.target.files[0].path;
  	const bat = spawn(bin.path, ['-i', filename, filename+'.avi', '-y', '-progress', 'pipe:1']);

  	bat.stdout.on('data', (data) => {
		  var tLines = data.toString().split('\n');
		    var progress = {};
		    for (var i = 0; i < tLines.length; i++) {
		        var key = tLines[i].split('=');
		        if (typeof key[0] != 'undefined' && typeof key[1] != 'undefined') {
		            progress[key[0]] = key[1];
		        }
		    }
		    console.log(progress);
		});

		bat.stderr.on('data', (data) => {
		  console.log(data.toString());
		});

		bat.on('exit', (code) => {
		  console.log(`Child exited with code ${code}`);
		});
  }	
  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>wqfqwf</h2>
        <input type = "file" onChange = {this.hue.bind(this)}/>
        <Link to={routes.COUNTER}>to Counter</Link>
      </div>
    );
  }
}