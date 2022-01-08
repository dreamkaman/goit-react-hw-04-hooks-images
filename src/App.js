import { useState, useEffect } from 'react';
import { photosApi } from './shared/services/photos';

import Searchbar from './components/Searchbar';
import Loader from 'react-loader-spinner';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';

import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  const [bigState, setBigState] = useState({
    gallery: [],
    querySubmited: '',
    page: 1,
    loading: false,
    showModal: false,
    currentLargeImageURL: '',
    currentTags: '',
    err: '',
  });
  const {
    gallery,
    querySubmited,
    page,
    loading,
    showModal,
    currentLargeImageURL,
    currentTags,
    err,
  } = bigState;

  useEffect(() => {
    if (loading) {
      photosApi
        .searchPhotos(page, querySubmited)
        .then(res => {
          const newgallery = res.data.hits;

          if (page === 1) {
            setBigState(prevstate => ({
              ...prevstate,
              gallery: newgallery,
              loading: false,
              err: '',
            }));
          } else {
            setBigState(prevstate => ({
              ...prevstate,
              gallery: [...prevstate.gallery, ...newgallery],
              loading: false,
              err: '',
            }));
          }
        })
        .catch(error => {
          error = new Error(`Something went wrong. The error apiered: "${error.message}"`);
          setBigState(prevstate => ({ ...prevstate, err: error.message, gallery: [] }));
        })
        .finally(setBigState(prevstate => ({ ...prevstate, loading: false })));
    }
  }, [loading]);

  const handleSubmit = query => {
    if (query !== querySubmited) {
      setBigState(prevstate => ({ ...prevstate, querySubmited: query, page: 1, loading: true }));
    }
  };

  const handleLoadMore = () => {
    setBigState(prevstate => ({ ...prevstate, page: prevstate.page + 1, loading: true }));
  };

  const toggleModal = id => {
    const currentImage = gallery.find(image => image.id === id);
    setBigState(prevstate => ({
      ...prevstate,
      showModal: !prevstate.showModal,
      currentLargeImageURL: currentImage?.largeImageURL,
      currentTags: currentImage?.tags,
    }));
  };

  return (
    <div className="App">
      {loading && <Loader type="Bars" color="#00BFFF" height={100} width={100} timeout={1000} />}
      {err && <p>{err}</p>}
      {!!gallery.length && (
        <>
          <ImageGallery gallery={gallery} onShowModal={toggleModal} />
          <Button onClick={handleLoadMore} />
        </>
      )}
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={currentLargeImageURL} alt={currentTags} />
        </Modal>
      )}
      <Searchbar onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
