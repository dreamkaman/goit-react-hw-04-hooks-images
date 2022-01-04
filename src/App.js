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
  const [gallery, setGallery] = useState([]);
  const [querySubmited, setQuerySubmited] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentLargeImageURL, setCurrentLargeImageURL] = useState('');
  const [currentTags, setCurrentTags] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (loading) {
      photosApi
        .searchPhotos(page, querySubmited)
        .then(res => {
          const newgallery = res.data.hits;

          if (page === 1) {
            setGallery([...newgallery]);
          } else {
            setGallery([...gallery, ...newgallery]);
          }
          setLoading(false);
          setErr('');
        })
        .catch(error => {
          error = new Error(`Something went wrong. The error apiered: "${error.message}"`);
          setErr(error.message);
          setGallery([]);
        })
        .finally(setLoading(false));
    }
  }, [loading]);

  const handleSubmit = query => {
    if (query !== querySubmited) {
      setQuerySubmited(query);
      setPage(1);
      setLoading(true);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const toggleModal = id => {
    const currentImage = gallery.find(image => image.id === id);
    setShowModal(!showModal);
    setCurrentLargeImageURL(currentImage?.largeImageURL);
    setCurrentTags(currentImage?.tags);
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
