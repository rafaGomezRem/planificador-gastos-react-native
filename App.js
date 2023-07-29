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

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});

  const handleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor');
    }
  };

  const handleGasto = gasto => {
    if (Object.values(gasto).includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    //Añadir el nuevo gasto al state
    gasto.id = generarId();
    gasto.fecha = Date.now();

    setGastos([...gastos, gasto]);
    setModal(!modal);
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
          <ListadoGastos
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
          />
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
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable
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
  imagen: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 30,
    bottom: 20,
  },
});

export default App;
