import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

export default function App() {
  const [points, setPoints] = useState(0);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    updatePoints();
  }, [actions])

  const updatePoints = () => {
    var localPoints = 0;
    for (var i = 0; i < actions.length; i++) {
      if (actions[i] === "CCB") {
        localPoints += 10;
      } else if (actions[i] === "WCB") {
        localPoints += 5;
      } else if (actions[i] === "F") {
        localPoints -= 5;
      } else if (actions[i] === "YC") {
        localPoints -= 10;
      } else if (actions[i] === "RC") {
        localPoints -= 1000;
      }
    }
    setPoints(localPoints);
  }

  const addSimpleScoring = (type) => {
    var localActions = [...actions];
    localActions.push(type);
    setActions(localActions);
  }

  const undo = () => {
    var localActions = [...actions];
    localActions.pop();
    setActions(localActions);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <View style={styles.container}>
        <View style={{ width: '45%' }}>
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: 'bold' }}>Scoring</Text>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => addSimpleScoring("CCB")}>
                <Text>Correct Color Ball</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => addSimpleScoring("WCB")}>
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
              <View style={{ flexDirection: 'row' }}>
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
              <TouchableOpacity style={styles.button} onPress={() => undo()}>
                <Text>Undo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setActions([])}>
                <Text>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <View style={styles.points}>
              <Text style={styles.pointsText}>Points: {points < 0 ? 0 : points}</Text>
            </View>
          </View>
        </View>
        <View style={{ width: '45%' }}>
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: 'bold' }}>Penalties</Text>
            <View>
              <TouchableOpacity style={styles.button} onPress={() => addSimpleScoring("F")}>
                <Text>Foul</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: '#FDFD96'}]} onPress={() => addSimpleScoring("YC")}>
                <Text>Yellow Card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: '#FF6961'}]} onPress={() => addSimpleScoring("RC")}>
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
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsText: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    fontSize: 75
  },
});
