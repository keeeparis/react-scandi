/* eslint-disable react/no-danger */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import Error from '../../components/Error'
import ImagesProduct from '../../components/ImagesProduct'
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
      currentCurrency,
    } = this.props

    /* Fetch Product Info only! after currencies has been fetched. */
    if (currentCurrency.symbol) {
      fetchProductDispatch(params.id)
    }
  }

  componentDidUpdate(prev: Props) {
    const {
      product,
      fetchProductDispatch,
      router: { params },
    } = this.props
    const { currentPicture } = this.state

    if (product && !currentPicture) {
      this.setState({ currentPicture: product.gallery[0] })
    }

    /* If previous props.currency was empty string (has not been fetched)
    fetch Product Info, otherwise we changing currencies and so do nothing. */
    if (!prev.currentCurrency.symbol) {
      fetchProductDispatch(params.id)
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

    const isPendingDiv = status === 'pending' && <Spinner />
    const isErrorDiv = status === 'failed' && (
      <Error msg="Unable to fetch product" />
    )

    const isSuccessAndProduct = status === 'success' && product
    const isSuccessAndNull = status === 'success' && !product && (
      <div>Product does not exists.</div>
    )

    return (
      <div className={styles.Wrap}>
        {isPendingDiv}
        {isErrorDiv}
        {isSuccessAndNull}
        {isSuccessAndProduct && (
          <div className={styles.Container}>
            {/* Images */}
            <ImagesProduct
              images={product.gallery}
              handleChange={this.handleImageChange}
              currentPicture={currentPicture}
            />

            {/* Data */}
            <div className={styles.Data}>
              {/* Name */}
              <div className={styles.Brand}>{product.brand}</div>
              <div className={styles.Title}>{product.name}</div>
              {/* Attributes */}
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
              {/* Price */}
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
              {/* Description */}
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
  currentCurrency: state.currency.currentCurrency,
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
