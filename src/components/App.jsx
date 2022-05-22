import { Component } from 'react';

import Container from './Conatainer';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './Searchbar';

import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    imageName: '',
  };

  hundleFormSubmit = imageName => {
    this.setState({ imageName: imageName });
  };

  render() {
    const { imageName } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.hundleFormSubmit} />
        <ToastContainer autoClose={3000} pauseOnHover={false} />
        <ImageGallery imageName={imageName} />
      </Container>
    );
  }
}

export { App };
