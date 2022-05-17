/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react'
import { Product } from '../../redux/types'
import styles from './Slider.module.scss'

interface Props {
  images: Product['gallery']
}

interface State {
  current: number
}

export class Slider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { current: 0 }
  }

  increment = () => {
    const { images } = this.props
    const { current } = this.state
    if (images.length - 1 === current) {
      return
    }

    this.setState({
      current: current + 1,
    })
  }

  decrement = () => {
    const { current } = this.state
    if (current === 0) {
      return
    }

    this.setState({ current: current - 1 })
  }

  render() {
    const { images } = this.props
    const { current } = this.state

    return (
      <div className={styles.Wrapper}>
        <div
          className={styles.Inner}
          style={{
            transform: `translateX(${-1 * current * 192}px)`,
          }}
        >
          {images.map((image) => (
            <img src={image} alt="next" key={image} />
          ))}
        </div>

        <div className={styles.Actions}>
          <div
            className={styles.Left}
            aria-label="next"
            onClick={this.decrement}
          />
          <div
            className={styles.Right}
            aria-label="back"
            onClick={this.increment}
          />
        </div>
      </div>
    )
  }
}

export default Slider
