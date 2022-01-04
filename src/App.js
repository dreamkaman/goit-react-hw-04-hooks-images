import { Component } from 'react';
import { photosApi } from './shared/services/photos';

import Searchbar from './components/Searchbar';
import Loader from 'react-loader-spinner';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class App extends Component {
  state = {
    gallery: [],
    querySubmited: '',
    page: 1,
    loading: false,
    showModal: false,
    currentLargeImageURL: '',
    currentTags: '',
    error: '',
    // status: 'idle',
  };

  componentDidUpdate() {
    if (this.state.loading) {
      const { page, querySubmited } = this.state;

      photosApi
        .searchPhotos(page, querySubmited)
        .then(res => {
          const newgallery = res.data.hits;

          if (page === 1) {
            this.setState({
              gallery: [...newgallery],
              loading: false,
            });
          } else {
            this.setState(prevstate => ({
              gallery: [...prevstate.gallery, ...newgallery],
              loading: false,
            }));
          }
        })
        .catch(error => {
          error = new Error(`Something went wrong. The error apiered: "${error.message}"`);
          this.setState({ err: error.message, gallery: [] });
        })
        .finally(this.setState({ loading: false }));
    }
  }

  handleSubmit = query => {
    if (query !== this.state.querySubmited) {
      this.setState({
        querySubmited: query,
        page: 1,
        loading: true,
      });
    }
  };

  handleLoadMore = () => {
    this.setState(prevstate => ({
      page: prevstate.page + 1,
      loading: true,
    }));
  };

  toggleModal = id => {
    const currentImage = this.state.gallery.find(image => image.id === id);
    this.setState(prevstate => ({
      showModal: !prevstate.showModal,
      currentLargeImageURL: currentImage?.largeImageURL,
      currentTags: currentImage?.tags,
    }));
  };

  render() {
    return (
      <div className="App">
        {this.state.loading && (
          <Loader type="Bars" color="#00BFFF" height={100} width={100} timeout={1000} />
        )}
        {this.state.err && <p>{this.state.err}</p>}
        {!!this.state.gallery.length && (
          <>
            <ImageGallery gallery={this.state.gallery} onShowModal={this.toggleModal} />
            <Button onClick={this.handleLoadMore} />
          </>
        )}
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={this.state.currentLargeImageURL} alt={this.state.currentTags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
