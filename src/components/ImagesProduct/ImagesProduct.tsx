/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react'
import { Product } from '../../redux/types'
import styles from './ImagesProduct.module.scss'

interface Props {
  images: Product['gallery']
  handleChange: (img: string) => () => void
  currentPicture: string
}

export class ImagesProduct extends PureComponent<Props, unknown> {
  render() {
    const { handleChange, images, currentPicture } = this.props

    return (
      <div className={styles.Images}>
        {/* All Images */}
        <div className={styles.AllImages}>
          {images.map((image) => (
            <div
              className={styles.ImageWrapper}
              key={image}
              onClick={handleChange(image)}
              role="treeitem"
              tabIndex={0}
            >
              <img src={image} alt={image} />
            </div>
          ))}
        </div>

        {/* Selected Image */}
        <div className={styles.SelectedImage}>
          <div className={styles.SelectedImageWrapper}>
            <img src={currentPicture} alt={currentPicture} />
          </div>
        </div>
      </div>
    )
  }
}

export default ImagesProduct
