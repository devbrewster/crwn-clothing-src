import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button, {BUTTON_TYPES_CLASSES} from '../buttons/buttons.component';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemsToCart } = useContext(CartContext);

    const addProductToCart = () => addItemsToCart(product);

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>
                Add to card
            </Button>
        </div>
    );
};

export default ProductCard;