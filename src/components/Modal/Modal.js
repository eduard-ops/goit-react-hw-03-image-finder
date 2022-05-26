import { Component } from 'react';

import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    tags: PropTypes.string.isRequired,
    bigImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseEsc);
  }

  onCloseEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { bigImage, tags } = this.props;
    return (
      <div className="backdrop" onClick={this.onCloseBackdrop}>
        <div className="modal">
          <img className="modal-img" src={bigImage} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
