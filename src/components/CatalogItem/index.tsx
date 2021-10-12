import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { addProductToCartRequest } from '../../store/modules/cart/actions';
import { ICartItem, IProduct } from '../../store/modules/cart/types';

import './styles.scss';

interface CatalogItemProps {
  product: IProduct & { formatedPrice: string };
}

export function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback(() => {
    dispatch(
      addProductToCartRequest({
        id: product.id,
        title: product.title,
        price: product.price,
      })
    );
  }, [dispatch, product]);

  return (
    <div className="card">
      <div className="card-body">
        <h2>{product.title}</h2>
        <span>{product.formatedPrice}</span>
        <button
          type="button"
          onClick={handleAddProductToCart}
          disabled={hasFailedStockCheck}
        >
          Comprar
        </button>
      </div>
      {hasFailedStockCheck && (
        <span className="failed-stock">Falta de estoque</span>
      )}
    </div>
  );
}
