import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

AlbumList.propTypes = {
    album : PropTypes.object,
};
AlbumList.defaultProps = {
    album : null,
};

function AlbumList({album}) {
    return (
        <div className='album-item'>
            <img className='album-item__image' src= {album.link} alt="" />
            <p className='album-item__title'>{album.title}</p>
        </div>
    );
}

export default AlbumList;