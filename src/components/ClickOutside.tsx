import React, { Component } from 'react'

interface ClickOutsideProps {
  callback: () => void
  children: React.ReactNode
}

/**
 * Component that activates callback if you click outside of it.
 */

export default class ClickOutside extends Component<
  ClickOutsideProps,
  unknown
> {
  wrapperRef: React.RefObject<HTMLDivElement>

  constructor(props: ClickOutsideProps) {
    super(props)

    this.wrapperRef = React.createRef()
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true)
  }

  /**
   * Activate callback if clicked on outside of element
   */
  handleClickOutside(event: MouseEvent) {
    const { callback } = this.props
    if (
      this.wrapperRef &&
      !this.wrapperRef.current?.contains(event.target as Node)
    ) {
      callback()
    }
  }

  render() {
    const { children } = this.props
    return <div ref={this.wrapperRef}>{children}</div>
  }
}
