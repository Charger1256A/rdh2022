import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
import axios from 'axios';

const ACCY = {
  "CCB": "Correct Color Ball",
  "WCB": "Wrong Color Ball",
  "F": "Foul",
  "YC": "Yellow Card",
  "RC": "Red Card",
  "MG": "Mid Goal",
  "RLB": "Reach Low Bar",
  "CLB": "Climb Low bar",
  "CO": "Cross Obstacle",
  "ELK": "Enter Lab Nook",
  "HPS": "Human Player Shot",
}

export default function App() {
  const [points, setPoints] = useState(0);
  const [actions, setActions] = useState([]);
  const [endgame, setEndgame] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [teamNumber, setTeamNumber] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  
  
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
      } else if (actions[i] === "MG") {
        localPoints += 12;
      } else if (actions[i] === "RLB") {
        localPoints += 5;
      } else if (actions[i] === "CLB") {
        localPoints += 15;
      } else if (actions[i] === "CO") {
        localPoints += 2;
      } else if (actions[i] === "ELK") {
        localPoints += 5;
      } else if (actions[i] === "HPS") {
        localPoints += 10;
      }
    }
    setPoints(localPoints);
  }

  function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count; 
  }

  const updateEndgame = (bar) => {
    setEndgame(bar);
    addSimpleScoring(bar);
  }

  const addSimpleScoring = (type) => {
    var localActions = [...actions];
    if (type === "MG") {
      if (getOccurrence(localActions, "MG") === 3) {
        return;
      }
    } else if (type === "CO") {
      if (getOccurrence(localActions, "CO") === 4) {
        return;
      }
    } else if (type === "ELK") {
      if (getOccurrence(localActions, "ELK") === 1) {
        return;
      }
    } else if (type === "HPS") {
      if (getOccurrence(localActions, "HPS") === 1) {
        return;
      }
    } else if (type === "CLB") {
      if (getOccurrence(localActions, "RLB") === 1) {
        var localActions = [];
        for (var i = 0; i < actions.length; i++) {
          if (actions[i] !== "RLB") {
            localActions.push(actions[i]);
          }
        }
        setActions(localActions);    

      }
      if (getOccurrence(localActions, "CLB") === 1) {
        var localActions = [];
        for (var i = 0; i < actions.length; i++) {
          if (actions[i] !== "CLB") {
            localActions.push(actions[i]);
          }
        }
        setActions(localActions);
        setEndgame("");
        return; 
      }
    } else if (type === "RLB") {
      if (getOccurrence(localActions, "CLB") === 1) {
        var localActions = [];
        for (var i = 0; i < actions.length; i++) {
          if (actions[i] !== "CLB") {
            localActions.push(actions[i]);
          }
        }
        setActions(localActions);
        
      }
      if (getOccurrence(localActions, "RLB") === 1) {
        var localActions = [];
        for (var i = 0; i < actions.length; i++) {
          if (actions[i] !== "RLB") {
            localActions.push(actions[i]);
          }
        }
        setActions(localActions);
        setEndgame("");
        return;
      }
    }
    localActions.push(type);
    setActions(localActions);
  }

  const undo = () => {
    var localActions = [...actions];
    if (localActions[localActions.length - 1] === "CLB" || localActions[localActions.length - 1] === "RLB") {
      setEndgame("")
    }
    localActions.pop();
    setActions(localActions);
  }

  const clear = () => {
    setActions([]);
    setEndgame("");
    setTeamNumber("");
    setMatchNumber("");
  }

  const uploadData = async () => {
    const response = await axios.post('https://rdh-2022.herokuapp.com/data/upload', { actions: JSON.stringify(actions), matchNumber: matchNumber, teamNumber: teamNumber, points: points });
    clear();
  }


  return (
    <KeyboardAvoidingView behavior="view" enabled>
      <View style={styles.container}>
        <View style={{ width: '45%' }}>
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: 'bold' }}>Scoring</Text>
            <View>
              <TouchableOpacity style={[styles.button, {backgroundColor: "#00FFF2" }]} onPress={() => addSimpleScoring("CCB")}>
                <Text>Correct Color Ball</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: "#00FF42" }]} onPress={() => addSimpleScoring("WCB")}>
                <Text>Wrong Color Ball</Text>
              </TouchableOpacity >
              <TouchableOpacity style={[styles.button, {backgroundColor: "#FFFB00" }]} onPress={() => addSimpleScoring("MG")}>
                <Text>Mid Goal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: "#FF6C00" }]} onPress={() => addSimpleScoring("CO")}>
                <Text>Cross Obstacle</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                {endgame == "RLB" ? (
                  <TouchableOpacity style={[styles.button, { width: '48%', backgroundColor: '#aec6cf' }]} onPress={() => updateEndgame("RLB")}>
                      <Text>Reach low Bar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={[styles.button, { width: '48%' }]} onPress={() => updateEndgame("RLB")}>
                      <Text>Reach low Bar</Text>
                  </TouchableOpacity>
                )}
                {endgame == "CLB" ? (
                  <TouchableOpacity style={[styles.button, { width: '48%', backgroundColor: '#aec6cf' }]} onPress={() => updateEndgame("CLB")}>
                    <Text>Climb low Bar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={[styles.button, { width: '48%' }]} onPress={() => updateEndgame("CLB")}>
                    <Text>Climb low Bar</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity style={[styles.button, {backgroundColor: "#FF005A" }]} onPress={() => addSimpleScoring("HPS")}>
                <Text>Human Player Shot</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: 'bold' }}>Management</Text>
            <View>   
              <TouchableOpacity style={[styles.button, {backgroundColor: "#9E00FF" }]} onPress={() => undo()}>
                <Text>Undo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: "#008DFF" }]} onPress={() => clear()}>
                <Text>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <View style={styles.points}>
              <Text style={styles.pointsText}>Points: {points < 0 ? 0 : points}</Text>
            </View>
          </View>
          <View style={{ width: "100%", alignItems: 'center' }}>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(true)}>
              <Text style={{ color: "white" }}>Get Match Data for Team</Text>
            </TouchableOpacity>
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
          <View style={{ width: "100%" }}>
            <Text style={{ fontWeight: 'bold' }}>Team Information</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={styles.input}
                  value={teamNumber}
                  onChangeText={setTeamNumber}
                  placeholder="Team number"
                />
                <TextInput
                  style={styles.input}
                  value={matchNumber}
                  onChangeText={setMatchNumber}
                  placeholder="Match number"
                />
              </View>
              <View style={{ alignItems: 'center'}}>
                <TouchableOpacity style={styles.modalButton} onPress={() => uploadData()}>
                  <Text style={{color: 'white'}}>Submit</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
        <Modal animationInTiming={50} animationIn='fadeIn' animationOutTiming={50} animationOut='fadeOut' style={{ alignItems: 'center' }} isVisible={isModalVisible}>
          <TouchableOpacity style={{ position: 'absolute', left: 63, top: 45, zIndex: 1 }} onPress={() => setModalVisible(false)}>
            <Text style={{ fontSize: 20 }}>X</Text>
          </TouchableOpacity>
          <View style={styles.ModalContent}>
            <View style={{ width: '50%', borderRightWidth: 3, borderColor: 'grey' }}>
                <Text style={styles.font}>Stats</Text>
                <Text>Correct Color Ball: {getOccurrence(actions, "CCB")}</Text>
                <Text>Wrong Color Ball: {getOccurrence(actions, "WCB")}</Text>
                <Text>Mid Goal: {getOccurrence(actions, "MG")}</Text>
                <Text>Cross Obstacle: {getOccurrence(actions, "CO")}</Text>
                <Text>Enter Lab Nook: {getOccurrence(actions, "CCB") === 1 ? <Text>true</Text> : <Text>false</Text>}</Text>
                <Text>Bar: {getOccurrence(actions, "RLB") === 1 ? <Text>Reach</Text> : getOccurrence(actions, "CLB") === 1 ? <Text>Climb</Text> : <Text>N/A</Text>}</Text>
                <Text>Human Player Shot: {getOccurrence(actions, "HPS") === 1 ? <Text>true</Text> : <Text>false</Text>}</Text>
                <Text>Foul: {getOccurrence(actions, "F")}</Text>
                <Text>Yellow Card: {getOccurrence(actions, "YC")}</Text>
                <Text>Red Card: {getOccurrence(actions, "RC")}</Text>
            </View>
            <View style={{ width: '50%', paddingLeft: 15 }}>
              <Text style={styles.font}>Events</Text>
              <ScrollView>
                {
                  actions.map((action, i) => (
                    <View key={i} style={styles.border}>
                      <Text key={i}>{i + 1}. {ACCY[action]}</Text>
                    </View>
                  ))
                }
              </ScrollView>
            </View>
          </View>
        </Modal>
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
  modalButton: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 50,
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
  ModalContent: {
    flex: 0.9,
    width: "90%",
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row'
  },
  font: {
    fontFamily: 'Zapfino',
    fontSize: 25
  },
  border: {
    borderWidth: 2.5,
    borderColor: '#d4d4d4',
    margin: 3,
    padding: 4
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '45%',
  },
});
