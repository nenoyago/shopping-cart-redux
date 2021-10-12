import { useEffect, useState } from 'react';

import { IProduct } from '../../store/modules/cart/types';

import api from '../../services/api';
import { CatalogItem } from '../CatalogItem';

import { numberFormat } from '../../utils/intlFormat';

import './styles.scss';

type ProductProps = IProduct & { formatedPrice: string };

export function Catalog() {
  const [catalog, setCatalog] = useState<ProductProps[]>([]);

  useEffect(() => {
    api.get<IProduct[]>('products').then(response => {
      const { data } = response;

      const serializedProducts = data.map(product => {
        return {
          ...product,
          formatedPrice: numberFormat(product.price),
        };
      });

      setCatalog(serializedProducts);
    });
  }, []);

  return (
    <div className="container">
      <h1>Catálogo Digital</h1>
      <div>
        {catalog.map(product => (
          <CatalogItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
