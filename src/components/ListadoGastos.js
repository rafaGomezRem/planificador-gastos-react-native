import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setModal, setGasto }) => {
    return (
    <View style={styles.contenedor}>  
      <Text style={styles.titulo}>ListadoGastos</Text>
        {gastos.length === 0 ? <Text style={styles.noGastos}>No hay gastos</Text> : gastos.map(gasto => (
            <Gasto 
            setGasto={setGasto}
            key={gasto.id}
            gasto={gasto}
            setModal={setModal}
            />
        )) }
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 70,
        marginBottom: 100
    },
    titulo: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noGastos: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }
})

export default ListadoGastos