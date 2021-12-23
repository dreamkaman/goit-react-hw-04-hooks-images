import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';

import styles from './ImageGallery.module.css';

const ImageGallery = props => {
  const { gallery, onShowModal } = props;

  const elements = gallery.map(image => {
    return (
      <ImageGalleryItem
        key={image.id}
        id={image.id}
        src={image.webformatURL}
        alt={image.tags}
        handleShowModal={id => onShowModal(id)}
      />
    );
  });

  return <ul className={styles.gallery}>{!!gallery.length && elements}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.shape),
  onShowModal: PropTypes.func,
};
