import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Gasto from './Gasto';

const ListadoGastos = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>ListadoGastos</Text>
      {filtro
        ? gastosFiltrados.map(map => {
            <Gasto
              setGasto={setGasto}
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
            />;
          })
        : gastos.map(gasto => (
            <Gasto
              setGasto={setGasto}
              key={gasto.id}
              gasto={gasto}
              setModal={setModal}
            />
          ))}

      {gastos.length === 0 ||
        (gastosFiltrados.length === 0 && !!filtro && (
          <Text style={styles.noGastos}>No Hay Gastos</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 30,
    marginBottom: 100,
  },
  titulo: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noGastos: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ListadoGastos;
