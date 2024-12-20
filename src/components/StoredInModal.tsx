import React, {useEffect, useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SelectBoardModal from './SelectBoardModal';
import {database} from '../utils/firebase';
import {collection, getDocs} from 'firebase/firestore';

type Photo = {
  id: number;
  width: number;
  height: number;
  src: {
    small: string;
    original: string;
  };
};

type Board = {
  id: string;
  name: string;
  description: string;
  // photos: Photo[] | null;
};

interface MoodBoardModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectExistingBoard: () => void;
  onCreateNewBoard: () => void;
  photo: Photo;
  navigation: any;
}

const StoredInModal: React.FC<MoodBoardModalProps> = ({
  visible,
  onClose,
  onSelectExistingBoard,
  onCreateNewBoard,
  photo,
  navigation,
}) => {
  const [selectBoardModalVisible, setSelectBoardModalVisible] = useState(false);
  const [boards, setBoards] = useState<
    {id: string; name: string; description: string}[]
  >([]);

  const handleCloseSelectBoardModal = () => {
    setSelectBoardModalVisible(false);
    onClose();
    onSelectExistingBoard();
  };

  useEffect(() => {
    const fetchBoardsFromDB = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'boards'));
        const boardsData: Board[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
        }));
        setBoards(boardsData);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    if (visible) {
      fetchBoardsFromDB();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Stored In:</Text>

          {boards.length > 0 ? (
            <>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setSelectBoardModalVisible(true)}>
                <Text style={styles.modalButtonText}>Existing Board</Text>
              </TouchableOpacity>
            </>
          ) : null}

          <TouchableOpacity
            style={styles.modalButton}
            onPress={onCreateNewBoard}>
            <Text style={styles.modalButtonText}>Create a Board</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>←</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SelectBoardModal
        visible={selectBoardModalVisible}
        onClose={handleCloseSelectBoardModal}
        boards={boards}
        navigation={navigation}
        photo={photo}
      />
    </Modal>
  );
};

export default StoredInModal;

const styles = StyleSheet.create({
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
