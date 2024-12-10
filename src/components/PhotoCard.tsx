import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

type Photo = {
    id: number;
    width: number;
    height: number;
    src: {
      small: string;
    };
};

type PhotoCardProps = {
    photo: Photo;
    columnWidth: number;
};

const PhotoCard = ({ photo, columnWidth }: PhotoCardProps) => {
    const imageWidth = columnWidth;
    const imageHeight = (photo.height / photo.width) * imageWidth;

    return (
        <View style={[styles.photoContainer, { width: columnWidth, height: imageHeight }]}>
            <Image
                source={{ uri: photo.src.small }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
  photoContainer: {
    marginBottom: 10,
    marginHorizontal: 5,
    // backgroundColor: '#FCFFF2',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PhotoCard;
