import React from 'react';
import style from './style.scss';

import svg from '../../../assets/icons/video.svg';

export default ({ name }) => (
  <div className={style.file}>
    <img className={style.icon} src={svg} />
    <div className={style.data}>
      <div className={style.fileName}>{name}</div>
      <div className={style.info}>(1920×1080 60fps)</div>
    </div>
  </div>
)
