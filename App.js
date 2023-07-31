import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import {generarId} from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor');
    }
  };

  const handleGasto = gasto => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastosActualizados);
    } else {
      //Añadir el nuevo gasto al state
      gasto.id = generarId();
      gasto.fecha = Date.now();

      setGastos([...gastos, gasto]);
    }

    setModal(!modal);
  };

  eliminarGasto = id => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí, Eliminar',
          onPress: () => {
            const gastosActualizados = gastos.filter(
              gastoState => gastoState.id !== id,
            );
            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ],
    );
  };

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro 
            filtro={filtro}
            setFiltro={setFiltro}
            gastos={gastos}
            setGastosFiltrados={setGastosFiltrados}
            />
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <FormularioGasto
            setGasto={setGasto}
            setModal={setModal}
            gasto={gasto}
            handleGasto={handleGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
          onPress={() => {
            setModal(!modal);
          }}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3bb2f6',
    minHeight: 400,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 40,
    bottom: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});

export default App;
