/* eslint-disable class-methods-use-this */
import React from 'react'

/**
 * Class that helps manage keyboard conditions.
 */
class KeyboardEvent {
  /**
   * If "Enter" or "Space" has been pressed on, returns true
   * and prevent default behavior of "Space" key. Otherwise,
   * returns false.
   */
  isSpaceOrEnterPressed(e: React.KeyboardEvent) {
    if (e.code === 'Enter' || e.code === 'Space') {
      this.preventDefaultSpaceKey(e)
      return true
    }
    return false
  }

  /**
   * Prevent default behavior with e.preventDefault()
   * */
  preventDefaultSpaceKey(e: React.KeyboardEvent) {
    e.preventDefault()
  }
}

export default new KeyboardEvent()
