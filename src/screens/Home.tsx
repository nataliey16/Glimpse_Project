import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AppLayout from '../layout/AppLayout';

import {ImageSourcePropType} from 'react-native';

type HomeBackgroundImgs = {
  id: number;
  imageSrc: ImageSourcePropType;
  description: string;
};

const homeBkgImgs = [
  {
    id: 1,
    imageSrc: require('../images/home/beach.png'), // Directly use require for images
    description: 'Image of a beach',
  },
  {
    id: 2,
    imageSrc: require('../images/home/woman_balloons.png'), // Directly use require for images
    description: 'Image of a woman and balloons',
  },
  {
    id: 3,
    imageSrc: require('../images/home/man_ocean.png'), // Directly use require for images
    description: 'Image of a ocean and man',
  },
  {
    id: 4,
    imageSrc: require('../images/home/mountains_beach.png'), // Directly use require for images
    description: 'Image of a mountain and beach',
  },
  {
    id: 5,
    imageSrc: require('../images/home/man_beach.png'), // Directly use require for images
    description: 'Image of a man and beach',
  },
  {
    id: 6,
    imageSrc: require('../images/home/woman_surf.png'), // Directly use require for images
    description: 'Image of woman surfing',
  },
];

const ImageCard = (props: HomeBackgroundImgs) => {
  const {id, imageSrc, description} = props;
  return (
    <View style={style.card}>
      <Image
        blurRadius={3} // Apply blur effect to the image
        source={imageSrc}
        alt={description}
        style={style.image}
      />
    </View>
  );
};

function Home({navigation}: {navigation: any}): React.JSX.Element {
  return (
    <AppLayout>
      <View style={style.homeView}>
        <Text style={[style.overlayText, style.headerText]}>
          Welcome to Glimpse
        </Text>

        <Text style={[style.overlayText, style.subHeaderText]}>
          Create Your Vision
        </Text>
        <View style={style.cardContainer}>
          {homeBkgImgs.map((img, index) => (
            <ImageCard
              key={index}
              id={img.id}
              imageSrc={img.imageSrc}
              description={img.description}
            />
          ))}
        </View>
      </View>
    </AppLayout>
  );
}

const style = StyleSheet.create({
  homeView: {
    flex: 1,
    backgroundColor: '#C3CFFA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  cardContainer: {
    flexDirection: 'row', // Creates two columns
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    width: '48%',
    marginBottom: 2,
    padding: 6,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 230,
    borderRadius: 20,
  },

  overlayText: {
    position: 'absolute',
    color: '#fff',
    textAlign: 'center',
    zIndex: 1, // Ensure text appears above the image
    textShadowColor: '#5856CB',
    textShadowOffset: {width: 1, height: 5},
    textShadowRadius: 10,
  },
  headerText: {
    top: '40%', // Vertically center the text
    fontSize: 35,
    fontWeight: 'bold',
  },
  subHeaderText: {
    top: '47%', // Vertically center the text
    fontSize: 30,
    fontWeight: 'medium',
  },
});

export default Home;
