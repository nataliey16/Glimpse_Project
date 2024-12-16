import React, {useState} from 'react';
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
}

function DeleteModal(props: DeleteModalProps): React.JSX.Element {
  const {handleCancelModal, handleDeleteModal, boardId} = props;

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={style.modalOverlay}>
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>
            {' '}
            Are you sure you want to delete board?
          </Text>
        </View>
        <View style={[style.editButtonView]}>
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
    height: height * 0.7,
    padding: 20,
    backgroundColor: '#C3CFFA',
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  editButtonView: {
    justifyContent: 'space-between',
  },

  editButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 70,
    marginBottom: 10,
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
