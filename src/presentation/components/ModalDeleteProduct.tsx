import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../theme/global.styles';
import { Product } from '../../core/entities/product.entity';
import { useProducts } from '../hooks/useProducts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigation';

interface Props {
    product: Product
}

export const ModalDeleteProduct = ({ product }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [modalVisible, setModalVisible] = useState(false);
    const {
        deleteProduct
    } = useProducts({ type: 'delete' });

    const handleDeletePress = () => {
        setModalVisible(true);
    };

    const handleConfirmDelete = () => {
        // Aquí ejecutas la lógica para eliminar
        deleteProduct(product.id)
        setModalVisible(false);
        navigation.navigate('Products');
    };
    return (
        <>
            <Pressable onPress={handleDeletePress} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
            </Pressable>
            <Modal
                transparent
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* Cerrar modal */}
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </Pressable>

                        {/* Contenido */}
                        <Text style={styles.modalText}>
                            ¿Estás seguro de eliminar el producto {product.nombre}?
                        </Text>

                        {/* Botones */}
                        <Pressable
                            style={globalStyles.prymaryButton}
                            onPress={handleConfirmDelete}
                        >
                            <Text style={globalStyles.prymaryButtonText}>Confirmar</Text>
                        </Pressable>

                        <Pressable
                            style={globalStyles.secondaryButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={globalStyles.secondaryButtonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    bankTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    idText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    extraInfo: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
    },
    deleteButton: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: '#E53935',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    deleteButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    actionButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    confirmButton: {
        backgroundColor: '#FFD700',
    },
    confirmText: {
        fontWeight: 'bold',
        color: '#000',
    },
    cancelButton: {
        backgroundColor: '#E0E0E0',
    },
    cancelText: {
        fontWeight: 'bold',
        color: '#000',
    },
});