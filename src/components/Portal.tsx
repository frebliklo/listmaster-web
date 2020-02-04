import React from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')

interface Props {}

class Portal extends React.Component {
  private el: HTMLDivElement

  constructor(props: Props) {
    super(props)
    this.el = document.createElement('div')
    this.el.classList.add('modal')
  }

  componentDidMount() {
    modalRoot?.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot?.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export default Portal
