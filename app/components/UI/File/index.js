import React from 'react';
import bytes from 'bytes';
import style from './style.scss';

import svg from '../../../assets/icons/video.svg';

export default ({ name, size = 0, resolution = [0,0], fps = 0, progress = false }) => (
  <div className={style.file}>
    <img className={style.icon} src={svg} />
    <div className={style.data}>
      <span className={style.fileName}>{name}</span>
      <span className={style.info}> {bytes(size)} ({resolution.join('×')} {fps}fps)</span>
      { progress != 0 &&  (
        <div className={style.progressBar}>
          <div className={style.progress} style={{width: progress + '%'}} />
        </div>
      )}
    </div>
  </div>
)
