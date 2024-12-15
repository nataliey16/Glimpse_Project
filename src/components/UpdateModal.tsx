import React, {useState} from 'react';
import {Modal, Text, View, StyleSheet} from 'react-native';

function UpdateModal(): React.JSX.Element {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={style.modalOverlay}>
        <View style={style.modalContent}>
          <Text> Are you sure you want to delete board</Text>
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

export default UpdateModal;
