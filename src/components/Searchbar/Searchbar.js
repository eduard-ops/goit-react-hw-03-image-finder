import { ReactComponent as IconSearch } from '../../images/icon-search.svg';

import { Component } from 'react';

import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    nameImage: '',
  };

  handleNameChange = e => {
    this.setState({ nameImage: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    const { nameImage } = this.state;
    e.preventDefault();
    if (nameImage.trim() === '') {
      toast.error('введите имя', { theme: 'colored' });
      return;
    }
    this.props.onSubmit(nameImage);
    this.setState({ nameImage: '' });
  };

  render() {
    return (
      <header className="header">
        <form onSubmit={this.handleSubmit} className="header-form">
          <button type="submit" className="header-form__button-search">
            <IconSearch />
          </button>
          <input
            className="header-form__input-search"
            type="text"
            value={this.state.nameImage}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
