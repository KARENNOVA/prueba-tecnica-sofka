import React from 'react'
import { Text, View } from 'react-native'
import { globalStyles } from '../theme/global.styles'
import { FormProduct } from '../components/FormProduct'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParams } from '../routes/StackNavigation'
import { useProducts } from '../hooks/useProducts'

export const EditProduct = () => {
    const params = useRoute<RouteProp<RootStackParams, 'editlProduct'>>().params;
    const {
        product
    } = useProducts({ type: 'get', id: `${params.id}` });
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Formulario de Edición</Text>
            <FormProduct type='edit' product={ product} />
        </View>
    )
}
