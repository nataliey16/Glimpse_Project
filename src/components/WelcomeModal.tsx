import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

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

const {width, height} = Dimensions.get('window');

const WelcomeModal = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={style.modalOverlay}>
        <View style={style.modalContent}>
          <TouchableOpacity style={style.closeButton} onPress={closeModal}>
            <Text style={style.buttonText}>Close</Text>
          </TouchableOpacity>
          <Text style={[style.headerText]}>Welcome to Glimpse</Text>
          <Text style={[style.subHeaderText]}>Create Your Vision</Text>
          <View style={[style.overlayText, style.instructionContent]}>
            <Text style={style.instructionText}>
              {`Step 1. Search Images: \nSearch to find images that \ninspire you.`}
            </Text>
            <Text style={style.instructionText}>
              {`Step 2. Add to Board: \nTap an image to save it to a new or existing mood board.`}
            </Text>
            <Text style={style.instructionText}>
              {`Step 3. View Your Boards: \nAccess your mood boards under your profile to see your goals and dreams.`}
            </Text>
          </View>
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
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    height: height * 0.7,
    backgroundColor: '#C3CFFA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#F79D7D',
    padding: 10,
    borderRadius: 20,
  },
  instructionContent: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    margin: 10,
    height: '65%',
    width: '95%',
    padding: 20,
    borderRadius: 20,
    opacity: 0.7,
  },
  instructionText: {
    color: '#000',
    paddingVertical: 10,
    fontSize: 20,
    textAlign: 'center',
    opacity: 1.0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
  },
  image: {
    width: '100%',
    height: 127,
    borderRadius: 20,
  },
  overlayText: {
    flex: 1,
    top: 155,
    position: 'absolute',
    zIndex: 1, // text appears above the image
  },
  headerText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: '#5856CB',
    textShadowOffset: {width: 1, height: 5},
    textShadowRadius: 10,
  },
  subHeaderText: {
    fontSize: 25,
    fontWeight: 'medium',
    marginBottom: 20,
  },
});

export default WelcomeModal;
