import { View, Modal, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PhotoModal = ({ photo, visible, onClose, onAddToMoodBoard,  }: any) => {
  if (!photo) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Image */}
          <Image
            source={{ uri: photo.src.original }}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToMoodBoardButton} onPress={onAddToMoodBoard}>
            <Text style={styles.buttonText}>Add to Mood Board</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.8,
    height: height * 0.7,
    backgroundColor: '#F7BC7D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#F79D7D',
    padding: 10,
    borderRadius: 20,
  },
  addToMoodBoardButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F79D7D',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: '90%',
    height: '90%',
  },
});

export default PhotoModal;
