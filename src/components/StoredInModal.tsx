import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Screen} from 'react-native-screens';

interface MoodBoardModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectExistingBoard: () => void;
  onCreateNewBoard: () => void;
  photo: any;
  navigation: any;
  route: any;
}

const StoredInModal: React.FC<MoodBoardModalProps> = ({
  visible,
  onClose,
  onSelectExistingBoard,
  onCreateNewBoard,
  photo,
  navigation,
  route,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Stored In:</Text>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={onSelectExistingBoard}>
            <Text
              style={styles.modalButtonText}
              onPress={() =>
                navigation.navigate('Profile', {screen: 'MyProfile'})
              }>
              Existing Board
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={onCreateNewBoard}>
            <Text style={styles.modalButtonText} onPress={onCreateNewBoard}>
              Create a Board
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>←</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default StoredInModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 背景半透明
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFA77A',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#F79D7D',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F79D7D',
  },
});
