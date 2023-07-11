import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    
    texto: {
        textAlign: 'center',
        fontSize: 30,
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingVertical: 20
    }
})

export default Header;
