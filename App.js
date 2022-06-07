import { useState } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={styles.container}>
        <View style={{ width: '45%' }}>
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: 'bold' }}>Scoring</Text>
            <View>
              <TouchableOpacity style={styles.button}>
                <Text>Correct Color Ball</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Wrong Color Ball</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Mid Goal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Cross Obstacle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Enter Lab Nook</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.button, { width: '48%' }]}>
                  <Text>Reach Low Bar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { width: '48%' }]}>
                  <Text>Climb low Bar</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text>Human Player Shot</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: 'bold' }}>Management</Text>
            <View>
              <TouchableOpacity style={styles.button}>
                <Text>Undo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ width: '45%' }}>
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: 'bold' }}>Penalties</Text>
            <View>
              <TouchableOpacity style={styles.button}>
                <Text>Foul</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: '#FDFD96'}]}>
                <Text>Yellow Card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: '#FF6961'}]}>
                <Text>Red Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },

  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    marginRight: 20,
    borderRadius: 10,
  }
});
