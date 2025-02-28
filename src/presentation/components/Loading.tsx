import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-gesture-handler'

export const Loading = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#6200ea" />
            <Text>Cargando...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
