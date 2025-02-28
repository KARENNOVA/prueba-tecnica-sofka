import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { globalStyles } from '../theme/global.styles';
import { ModalDeleteProduct } from '../components/ModalDeleteProduct';
import { type NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { type RootStackParams } from '../routes/StackNavigation';
import { useProducts } from '../hooks/useProducts';

export const DetailProduct = () => {
    const params = useRoute<RouteProp<RootStackParams, 'editlProduct'>>().params;
    
    const {
        product,
    } = useProducts({ type: 'get', id: `${params.id}` });

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    return (
        <View style={globalStyles.container}>

            <Text style={styles.idText}>ID: {product?.id}</Text>
            <Text style={styles.extraInfo}>Información extra</Text>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Nombre</Text>
                <Text style={styles.value}>{product?.nombre}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Descripción</Text>
                <Text style={styles.value}>{product?.descripcion}</Text>
            </View>

            <Text style={styles.label}>Logo</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 30
            }}>
                <Image
                // || product?.logo
                    source={{ uri: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg'    }} // Aquí va la URL real de la imagen
                    style={styles.logo}
                />
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Fecha liberación</Text>
                <Text style={styles.value}>{product?.fechaLiberacion}</Text>
            </View>

            <View style={styles.detailRow}>
                <Text style={styles.label}>Fecha revisión</Text>
                <Text style={styles.value}>{product?.fechaRevision}</Text>
            </View>

            <Pressable onPress={() => navigation.navigate('editlProduct', { id: `${params.id}` })} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar</Text>
            </Pressable>
            <ModalDeleteProduct product={product} />
        </View>
    );
}

const styles = StyleSheet.create({
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
    detailRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
    value: {
        fontSize: 14,
        fontWeight: '400',
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',

    },
    editButton: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    editButtonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
    },
    deleteButton: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: '#E53935',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    deleteButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});


