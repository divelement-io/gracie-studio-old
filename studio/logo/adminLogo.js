import React from 'react'
import styles from './adminLogo.css';

const myLogo = () => (
  <img
    src="/static/adminLogo.png"
    alt="Company Name"
    className={styles.myLogo}
    // style={{ width: 'auto', height: '100%', maxHeight: '3rem', display: 'block', margin: '-6px 0' }}
  />
)

export default myLogo