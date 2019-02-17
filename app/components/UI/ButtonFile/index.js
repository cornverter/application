import React from 'react';
import style from './styles.scss';

export default class ButtonFile extends React.Component {

  handleClick = (e) => {
    this.refs.input.click()
  }

  render() {
    const { props } = this;
    return (
      <div className={style.buttonFile + ' ' + props.className}>
        <input onChange={props.onChange} ref="input" className={style.input} type="file" multiple />
        <button onClick={this.handleClick}>{props.children}</button>
      </div>
    )
  }
}
