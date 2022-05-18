/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import Error from '../../components/Error'
import PriceProduct from '../../components/PriceProduct'
import Spinner from '../../components/Spinner'
import AttributeItem from '../../containers/AttributeItem'
import withRouter from '../../containers/withRouter/withRouter'
import { addItemToCart } from '../../redux/slices/cartSlice'
import { fetchProduct } from '../../redux/slices/productSlice'
import { AppDispatch, RootState } from '../../redux/store/store'
import { ProductInCart, SelectedAttributesType } from '../../redux/types'
import { KeyofOnlyString, ValueOf } from '../../types'
import styles from './Product.module.scss'
import { DispatchProps, OwnState, Props, StateProps } from './types'

export class Product extends PureComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedAttributes: {},
      currentPicture: '',
    }
  }

  componentDidMount() {
    const {
      fetchProductDispatch,
      router: { params },
    } = this.props

    fetchProductDispatch(params.id)
  }

  componentDidUpdate() {
    const { product } = this.props
    const { currentPicture } = this.state

    if (product && !currentPicture) {
      this.setState({ currentPicture: product.gallery[0] })
    }
  }

  handleSubmitButton = () => {
    const { addToCart, product } = this.props
    const { selectedAttributes } = this.state

    if (product) {
      addToCart({
        ...product,
        selectedAttributes,
      })
      this.resetAttributes()
    }
  }

  resetAttributes = () => {
    this.setState({ selectedAttributes: {} })
  }

  handleInputChange =
    (
      name: KeyofOnlyString<SelectedAttributesType>,
      value: ValueOf<SelectedAttributesType>
    ) =>
    () => {
      const { selectedAttributes } = this.state

      this.setState({
        selectedAttributes: {
          ...selectedAttributes,
          [name]: value,
        },
      })
    }

  handleImageChange = (img: string) => () => {
    this.setState({ currentPicture: img })
  }

  render() {
    const { product, status } = this.props
    const { selectedAttributes, currentPicture } = this.state

    const isButtonDisabled =
      product?.attributes.length !== Object.keys(selectedAttributes).length

    return (
      <div className={styles.Wrap}>
        {status === 'pending' && <Spinner />}
        {status === 'failed' && <Error />}
        {status === 'success' && product && (
          <div className={styles.Container}>
            {/* Images */}
            <div className={styles.Images}>
              <div className={styles.AllImages}>
                {product.gallery.map((image) => (
                  <div
                    className={styles.ImageWrapper}
                    key={image}
                    onClick={this.handleImageChange(image)}
                  >
                    <img src={image} alt={image} />
                  </div>
                ))}
              </div>
              <div className={styles.SelectedImage}>
                <div className={styles.SelectedImageWrapper}>
                  <img src={currentPicture} alt={currentPicture} />
                </div>
              </div>
            </div>

            {/* Data */}
            <div className={styles.Data}>
              <div className={styles.Brand}>{product.brand}</div>
              <div className={styles.Title}>{product.name}</div>

              <div className={styles.Attributes}>
                {product.attributes &&
                  product.attributes.map((el) => (
                    <AttributeItem
                      key={el.id}
                      attrSet={el}
                      selectedAttributes={selectedAttributes}
                      handleInputChange={this.handleInputChange}
                      readonly={false}
                      size="lg"
                    />
                  ))}
              </div>

              <div className={styles.Price}>
                <div className={styles.PriceName}>Price:</div>
                <div>
                  <PriceProduct product={product} />
                </div>
              </div>

              <Button
                onClick={this.handleSubmitButton}
                fill
                disabled={isButtonDisabled}
              >
                ADD TO CART
              </Button>

              <div
                className={styles.Description}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export const mapStateToProps = (state: RootState) => ({
  product: state.product.item,
  status: state.product.status,
})

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchProductDispatch: (id: string) => dispatch(fetchProduct(id)),
  addToCart: (product: ProductInCart) => dispatch(addItemToCart(product)),
})

const connector = connect<StateProps, DispatchProps, OwnState, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Product)

export default withRouter(connector)
