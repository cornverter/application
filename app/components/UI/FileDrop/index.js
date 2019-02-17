import React from 'react';
import ReactFileDrop from 'react-file-drop';
import style from './style.scss';

export default props => (
  <ReactFileDrop
    {...props}
    className={style.fileDrop + ' ' + props.className}
    draggingOverFrameClassName={style.draggingOverFrame}
  >
    <span className={style.dragText}>Drop file here</span>
    <div className={style.content}>{props.children}</div>
  </ReactFileDrop>
)
