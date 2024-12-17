import React from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

interface DeleteModalProps {
  handleCancelModal: () => void;
  handleDeleteModal: (boardId: string) => void;
  boardId: string;
  boardName: string;
}

function DeleteModal({
  handleCancelModal,
  handleDeleteModal,
  boardId,
  boardName, // Destructure the new prop
}: DeleteModalProps): React.JSX.Element {
  // const {handleCancelModal, handleDeleteModal, boardId} = props;

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={style.modalOverlay}>
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>
            {' '}
            Are you sure you want to delete "{boardName}"?
          </Text>
        </View>
        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={[style.editButton, style.cancelButton]}
            onPress={handleCancelModal}>
            <Text style={style.editButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.editButton, style.deleteButton]}
            onPress={() => handleDeleteModal(boardId)}>
            <Text style={style.editButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    justifyContent: 'center',
    width: width * 0.8,
    height: height * 0.4,
    padding: 20,
    backgroundColor: '#C3CFFA',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  editButtonView: {
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 70,
    marginBottom: 50,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  cancelButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F79D7D',
  },
});

export default DeleteModal;
