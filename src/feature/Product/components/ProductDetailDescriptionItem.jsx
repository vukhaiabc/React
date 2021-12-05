import React from 'react';
import PropTypes from 'prop-types';

ProductDetailDescriptionItem.propTypes = {
    
};

function ProductDetailDescriptionItem(props) {
    const {productDescription} = props
    return (
        <div>
            {productDescription}
        </div>
    );
}

export default ProductDetailDescriptionItem;