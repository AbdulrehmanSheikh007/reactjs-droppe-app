import * as React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Product.module.css";

interface props {
  product: any,
  onFav: (id: number) => void
}

const Product: React.FC<props> = ({product, onFav}) => {
  const { product: productClass, productBody, actionBarItem, actionBarItemLabel } = styles;

  return (
    <span className={productClass} style={{ display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both' }}>
      <span className={styles['product-title']} style={{ overflowX: 'hidden' }}>{product.title}</span>

      <p><strong>Rating:
        {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>

      <p><b>Price: ${+product.price}</b></p>

      <p className={productBody}>
        <span><b>Description:</b></span>
        <br />
        {product.description}
      </p>

      <span className={styles['action_bar']} style={{ display: 'table', width: "100%" }}>
        <span
          className={`${actionBarItem} ${product.isFavorite ? "active" : ""
            }`}
          role="button"
          onClick={() => {
            onFav(product.id);
          }}
        >
          <FaStar /> <span className={actionBarItemLabel}>{!!(!!(product.isFavorite)) ? 'Remove from favorites' : 'Add to favorites'}</span>
        </span>
      </span>
    </span>
  )
}

export default Product;