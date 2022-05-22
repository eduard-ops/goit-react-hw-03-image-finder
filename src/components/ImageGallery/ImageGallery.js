import { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem';

import GalleryApiService from '../../services/galleryApi';

import { toast } from 'react-toastify';

import Button from '../Button';

import Loader from '../Loader';

import Modal from '../Modal';

const api = new GalleryApiService();

class ImageGallery extends Component {
  state = {
    images: [],
    showModal: false,
    largeImg: '',
    tags: '',
    totalPage: '',
    spiner: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    if (prevProps.imageName !== imageName) {
      try {
        this.setState({ spiner: true });
        api.query = imageName;
        api.resetPage();
        const fetcApi = await api.fetchGallery();
        const { hits, totalHits } = fetcApi;
        this.setState({
          images: hits,
          totalPage: totalHits,
        });
        this.setState({ spiner: false });
      } catch (error) {
        this.setState({ spiner: false });
        toast.warning(`Couldnt find pictures with this name ${imageName}`, {
          theme: 'colored',
        });
      }
    }
  }

  onLoadMore = async () => {
    this.setState({ spiner: true });
    try {
      const fetcApi = await api.fetchGallery();
      const { hits } = fetcApi;
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
      this.setState({ spiner: false });
      if (api.page > this.state.totalPage / api.per_page) {
        toast.info(`No more pictures for your request 😢`, {
          theme: 'colored',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  quantityCheck() {
    return api.page !== Math.ceil(this.state.totalPage / api.per_page);
  }

  openModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  onClickImg = (bigImg, tags) => {
    this.setState({ largeImg: bigImg, tags: tags });
    this.openModal();
  };

  render() {
    const { images, spiner, showModal, largeImg, tags } = this.state;
    return (
      <>
        <ul className="gallery">
          {images.length > 0 && (
            <ImageGalleryItem hits={images} onClickImg={this.onClickImg} />
          )}
        </ul>
        {spiner && <Loader />}
        {images.length !== 0 && this.quantityCheck() && !spiner && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {showModal && (
          <Modal tags={tags} bigImage={largeImg} onClose={this.openModal} />
        )}
      </>
    );
  }
}

export default ImageGallery;
