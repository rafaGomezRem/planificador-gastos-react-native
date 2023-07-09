import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.text}>Planificador de gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3bb2f6'
    },
    texto: {
        textAlign: 'center',
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingVertical: 20
    }
})

export default Header;
