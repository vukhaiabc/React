import React from 'react';
import AlbumList from '../components/AlbumList';
import './styles.scss'

AlbumFeature.propTypes = {

};

function AlbumFeature() {
    const listAlbum = [
        {
            id: 1,
            title: 'Rap Viet 2021',
            link: 'https://avatar-ex-swe.nixcdn.com/playlist/2021/10/16/c/2/c/0/1634364740945_300.jpg'
        },
        {
            id: 2,
            title: "US-UK Today's Top Hits",
            link: 'https://avatar-ex-swe.nixcdn.com/playlist/2021/10/21/a/6/4/4/1634808343684_300.jpg'
        },
        {
            id: 3,
            title: "V-Pop 2021",
            link: 'https://avatar-ex-swe.nixcdn.com/playlist/2021/10/21/a/6/4/4/1634782307636_300.jpg'
        }
    ]
    return (
        <div className='albums'>
            <h2 className='albums-title'>Album Ca Nhạc Hot Nhất Hiện Nay</h2>
            <ul className='album-list'>
                {
                    listAlbum.map((item) => {
                        return (
                            <li key={item.id}><AlbumList album={item} /></li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default AlbumFeature;