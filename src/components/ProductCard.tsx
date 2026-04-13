import { Link } from 'react-router-dom';
import { Product } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group product-card-hover block">
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <h3 className="font-body text-sm font-medium text-foreground">{product.name}</h3>
        <p className="text-sm font-semibold text-foreground">{product.price} EGP</p>
      </div>
    </Link>
  );
};

export default ProductCard;
