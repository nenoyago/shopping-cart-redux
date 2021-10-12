import { useSelector } from 'react-redux';

import { IState } from '../../store';
import { ICartItem, IProduct } from '../../store/modules/cart/types';
import { numberFormat } from '../../utils/intlFormat';

import './styles.scss';

type CartItemProps = ICartItem & {
  product: IProduct & { formatedPrice: string; subTotal: string };
};

export function Cart() {
  const cart = useSelector<IState, CartItemProps[]>(state => {
    const serializedItems = state.cart.items.map(item => {
      return {
        quantity: item.quantity,
        product: {
          ...item.product,
          formatedPrice: numberFormat(item.product.price),
          subTotal: numberFormat(item.product.price * item.quantity),
        },
      };
    });

    return serializedItems;
  });

  return (
    <div className="container">
      {cart.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.product.id}>
                <td>{item.product.title}</td>
                <td>{item.product.formatedPrice}</td>
                <td>{item.quantity}</td>
                <td>{item.product.subTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
