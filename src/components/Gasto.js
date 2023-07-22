import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import globalStyles from '../styles'

const Gasto = ({ gasto }) => {
  const { nombre, categoria, cantidad, id } = gasto

  return (
    <View style={styles.contenedor}>
      <Text>{gasto.nombre}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    marginBottom: 20
  }

})

export default Gasto