import React from 'react'
import { FormProduct } from '../components/FormProduct'
import { Text, View } from 'react-native'
import { globalStyles } from '../theme/global.styles'

export const CreateProduct = () => {
    
    
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Formulario de Registro</Text>
            <FormProduct type="create" />
        </View>
    )
}

