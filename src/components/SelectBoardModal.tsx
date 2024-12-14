import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { database } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type Photo = {
    id: number;
    width: number;
    height: number;
    src: {
        small: string;
        original: string;
    };
};

interface SelectBoardModalProps {
    visible: boolean;
    onClose: () => void;
    boards: Array<{ id: string; name: string }>;
    photo: Photo;
    navigation: any;
}

const SelectBoardModal: React.FC<SelectBoardModalProps> = ({
    visible,
    onClose,
    boards,
    photo,
    navigation,
}) => {
    const handleSelectBoard = async (boardId: string) => {
        console.log(`Selected board: ${boardId}`);
        console.log('Selected photo id in the Selected board:', photo.id);

        try {
            const boardDocRef = doc(database, 'boards', boardId);
            await updateDoc(boardDocRef, {
                photos: arrayUnion({
                    id: photo.id,
                    width: photo.width,
                    height: photo.height,
                    src: photo.src,
                }),
            });
            onClose();
            navigation.navigate('Search');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const renderBoardItem = ({ item }: { item: { id: string; name: string } }) => (
        <TouchableOpacity style={styles.modalButton} onPress={() => handleSelectBoard(item.id)}>
        <Text style={styles.modalButtonText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Board</Text>

            <FlatList
                data={boards}
                renderItem={renderBoardItem}
                keyExtractor={(item) => item.id}
            />

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>←</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    );
};

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

export default SelectBoardModal;
