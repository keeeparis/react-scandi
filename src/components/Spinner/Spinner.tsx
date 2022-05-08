import React, { PureComponent } from 'react'
import styles from './Spinner.module.scss'

export class Spinner extends PureComponent {
  render() {
    return (
      <div className={styles.ldsRoller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    )
  }
}

export default Spinner
