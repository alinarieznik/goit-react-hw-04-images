import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './api';
import Notiflix from 'notiflix';
import { StyledApp } from './App.styled';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalImageAlt, setModalImageAlt] = useState(null);

  // doesnt work why?
  // useEffect(() => {
  //   async function getImages() {
  //     // if (!images.hits.length) {
  //     //   Notiflix.Notify.failure(
  //     //     'Sorry, there are no images matching your search query. Please try again.'
  //     //   );
  //     //   return;
  //     // }
  //     try {
  //       setLoading(true);
  //       const images = await fetchImages(query, page);

  //       setImages(...images, ...images.hits);
  //       setTotal(images.totalHits);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   getImages(query, page);
  //   console.log(images);
  // }, [query, page]);

  useEffect(() => {
    if (query !== '') {
      getImages(query, page);
    }
  }, [query, page]);

  const getImages = async (query, page) => {
    try {
      setLoading(true);
      const images = await fetchImages(query, page);
      if (!images.hits.length) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      setImages(prevImages => [...prevImages, ...images.hits]);
      setTotal(images.totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = query => {
    // for one more same render doesnt work
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setModalImage(largeImageURL);
    setModalImageAlt(tags);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && !loading && <p>Sorry, try again</p>}
      {images.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem images={images} onClick={toggleModal} />
        </ImageGallery>
      )}
      {loading && <Loader />}
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={modalImage}
          tags={modalImageAlt}
        />
      )}

      {total > images.length && !loading && images.length > 0 && (
        <Button onClick={handleLoadMore} />
      )}
    </StyledApp>
  );
}
