import React, { useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';

interface CompanyItemProps {
    item: {
      img: string;
      title: string;
    };
  }

const CompanyItem = (props: CompanyItemProps) => {
    const { item } = props;

    const [isLiked, setIsLiked] = useState(false);

    const isLogined = useSelector((state: any) => state.user.isLogined);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />

        {isLogined ? (
            <IconButton
                aria-label={`like ${item.title}`}
                onClick={toggleLike}
                color={isLiked ? 'error' : 'default'}
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                }}
            >
                <FavoriteIcon />
            </IconButton>
        ) : null}

          <ImageListItemBar
            title={item.title}
            position="below"
          />
        </ImageListItem>
    );
};

export default CompanyItem;
