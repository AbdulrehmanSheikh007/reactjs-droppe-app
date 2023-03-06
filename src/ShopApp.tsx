import { cloneDeep, find, findIndex } from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "./components/Button";
import { Form } from "./components/Form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./ShopApp.module.css";
import { useEffect, useState } from 'react';
import React from 'react';
import { addProduct, getProducts } from './services/ProductService';
import Product from './components/Product';
import { Pagination } from './components/Pagination';

interface ProductInterface {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  },
  isFavorite: boolean,
};

const ShopApp: React.FC<any> = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [numFavorites, setNumFavorites] = useState<number>(0);

  const [paginatedProducts, setPaginatedProducts] = useState<ProductInterface[]>([]);
  const [perPage, setPerPage] = useState<number>(5);
  const [paginatedStart, setPaginatedStart] = useState<number>(0);
  const [paginatedEnd, setPaginatedEnd] = useState<number>(perPage);

  // Triggers only on component mount (and only run the clear logic on unmount)
  useEffect(() => {
    document.title = "Droppe refactor app";

    (async () => {
      const products = await getProducts();
      products.map((product: any) => {
        product.isFavorite = false;
        return product;
      });

      setProducts(products);
    })();
  }, []);

  // Triggers after a product is added, page is changed
  useEffect(() => {
    if (!products.length) return;

    setPaginatedProducts(products.slice(paginatedStart, paginatedEnd));
  }, [products, paginatedStart, paginatedEnd]);

  const handleFavorite = (id: number) => {
    const product = find(products, { id: id });

    let currentFavs = numFavorites
    let totalFavs: any;

    if (product === undefined) return;

    switch (product.isFavorite) {
      case true:
        product.isFavorite = false;
        totalFavs = --currentFavs
        break;

      default:
        totalFavs = ++currentFavs
        product.isFavorite = true;
        break;
    }

    // Clone products so we can modify the product
    // Update product inside the cloned products array
    const productsClone = cloneDeep(products);
    const productIndex = findIndex(productsClone, { id: id });
    products[productIndex] = product;

    setProducts(products);
    setNumFavorites(totalFavs);
  }

  const handleSubmit = async (payload: { title: string, price: string, description: string }) => {
    const product = {
      id: products.length + 1,
      title: payload.title,
      price: parseFloat(payload.price),
      description: payload.description,
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0
      },
      isFavorite: false,
    };

    setProducts(previousState => [...previousState, product]);
    setIsOpen(false);
    setIsShowingMessage(false);
    setMessage('Adding product...');

    // Call add product api
    await addProduct();

    setTimeout(() => {
      setIsShowingMessage(false);
      setMessage('');
    }, 2000)
  }

  const handlePageChange = (page: number) => {
    const start = page === 1 ? 0 : (page - 1) * perPage;
    const end = start + perPage;

    setPaginatedStart(start);
    setPaginatedEnd(end);
  }

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={`container ${styles.headerImageWrapper}`}>
          <img src={logo} className={styles.headerImage} />
        </div>
      </div>

      <>
        <span
          className={`container ${styles.main}`}
          style={{ margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly' }}
        >
          <img src={img1} style={{ maxHeight: "15em", display: 'block' }} />
          <img src={img2} style={{ maxHeight: "15rem", display: 'block' }} />
        </span>
      </>

      <div className={`container ${styles.main}`} style={{ paddingTop: 0 }}>
        <div className={styles.buttonWrapper}>
          <span role="button">
            <Button onClick={() => setIsOpen(true)}>Send product proposal</Button>
          </span>
          {isShowingMessage && <div className={styles.messageContainer}>
            <i>{message}</i>
          </div>}
        </div>

        <div className={styles.statsContainer}>
          <span>Total products: {products.length}</span>
          {' - '}
          <span>Number of favorites: {numFavorites}</span>
        </div>

        <Pagination total={products.length} perPage={5} onPageChange={handlePageChange} />

        {
          paginatedProducts.map(product => (
            <Product product={product} onFav={handleFavorite} />
          ))
        }

        <Pagination total={products.length} perPage={5} onPageChange={handlePageChange} />
      </div>

      <Modal
        isOpen={isOpen}
        className={styles.reactModalContent}
        overlayClassName={styles.reactModalOverlay}
      >
        <div className={styles.modalContentHelper}>
          <div className={styles.modalClose} onClick={() => setIsOpen(false)}><FaTimes /></div>
          <Form onSubmit={handleSubmit} />
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default ShopApp;