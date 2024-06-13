import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import ExpressionBuilder from './components/ExpressionBuilder';

const generateUniqueRandomNumbers = (count, max) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers);
};

const generateTargetValue = (numbers) => {
  const operations = ['+', '-', '*', '/'];
  let chosenOperation1, chosenOperation2, chosenOperation3;
  let result;
  let expression;

  do {
    chosenOperation1 = operations[Math.floor(Math.random() * operations.length)];
    chosenOperation2 = operations[Math.floor(Math.random() * operations.length)];
    chosenOperation3 = operations[Math.floor(Math.random() * operations.length)];
    expression = `${numbers[0]} ${chosenOperation1} ${numbers[1]} ${chosenOperation2} ${numbers[2]} ${chosenOperation3} ${numbers[3]}`;
    result = eval(expression);
  } while (result >= 1000 || result <= -1000 || !Number.isInteger(result));

  return { targetValue: result, expression };
};

const App = () => {
  const [initialNumbers, setInitialNumbers] = useState(generateUniqueRandomNumbers(4, 99));
  const [numbers, setNumbers] = useState([...initialNumbers]);
  const [operators] = useState(['+', '-', '*', '/']);
  const [expression, setExpression] = useState('');
  const [targetValue, setTargetValue] = useState(0);
  const [targetExpression, setTargetExpression] = useState('');
  const [showNewGameButton, setShowNewGameButton] = useState(false);
  const [showTargetExpression, setShowTargetExpression] = useState(false);
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [calculationResult, setCalculationResult] = useState(null);
  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    generateGame();
  }, []);

  const generateGame = () => {
    const newInitialNumbers = generateUniqueRandomNumbers(4, 99);
    setInitialNumbers(newInitialNumbers);
    setNumbers(newInitialNumbers);
    let targetData;

    do {
      targetData = generateTargetValue(newInitialNumbers);
    } while (targetData.targetValue === null);

    setTargetValue(targetData.targetValue);
    setTargetExpression(targetData.expression);
    setShowNewGameButton(false);
    setShowTargetExpression(false);
    setUsedNumbers([]);
    setCalculationResult(null);
    setExpression('');
    setGameCount(0);
  };

  const handleNumberPress = (number) => {
    setExpression((prev) => prev + number);
    setUsedNumbers((prev) => [...prev, number]);
  };

  const handleOperatorPress = (operator) => {
    setExpression((prev) => prev + operator);
  };

  const handleReset = () => {
    setExpression('');
    setUsedNumbers([]);
    setShowNewGameButton(false);
    setCalculationResult(null);
  };

  const handleCheck = () => {
    try {
      let result = eval(expression)
      if(!Number.isInteger(result)){
        result=result.toFixed(1);
      };     
      setCalculationResult(result);
      if (result === targetValue) {
        Alert.alert(
          'Message',
          'Congratulations! You won the game. Tap the button to start a new game',
          [
            { text: 'New Game', onPress: () => generateGame() }
          ]
        );
        setShowNewGameButton(true);
      } else {
        Alert.alert('Message', 'Your expression is incorrect. Tap the button to try again.',
          [
            { text: 'Retry', onPress: () => {
              setGameCount((prevCount) => prevCount + 1);
              handleReset();
            }}
          ]
        );
      }
    } catch (error) {
      Alert.alert('Invalid expression', 'Please enter a valid expression.',
        [
          { text: 'Retry', onPress: () => {
            setGameCount((prevCount) => prevCount + 1);
            handleReset();
          }}
        ]
      );
    }
  };


  const handleHint = () => {
    Alert.alert(
      'Hint',
      `Target Expression: ${targetExpression}`,
      [
        { text: 'Got it!', onPress: () => {} }
      ]
    );
  };

  const handleNewGame = () => {
    generateGame();
  };

  return (
    <View style={{ backgroundColor: '#888888', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: '#99CCFF', flex: 8 / 9, borderRadius: 20 }}>
        <View style={styles.container}>
          <Text style={styles.title1}>EXPRESSION BUILDING</Text>
          <Text style={styles.title}>In this game, you will create an expression that gives the target value</Text>
          
          <View style={styles.infoContainer}>
  <Text style={styles.info}>YOUR VALUE</Text>
  <Text style={styles.info}>TARGET VALUE</Text>
  <Text style={styles.info}>TIMES</Text>
</View>

<View style={styles.infoContainer}>
  <Text style={styles.infoValue1}>{calculationResult}</Text>
  <Text style={styles.infoValue2}>{targetValue}</Text>
  <Text style={styles.infoValue3}>{gameCount}</Text>
</View>

<ExpressionBuilder
  numbers={numbers}
  operators={operators}
  expression={expression}
  onNumberPress={handleNumberPress}
  onOperatorPress={handleOperatorPress}
  onReset={handleReset}
  onCheck={handleCheck}
  onHint={handleHint}
  usedNumbers={usedNumbers}
/>

<TouchableOpacity style={styles.hintButton} onPress={handleHint}>
  <Text style={styles.buttonText}>Hint</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.newGameButton} onPress={handleNewGame}>
  <Text style={styles.buttonText}>New Game</Text>
</TouchableOpacity>

        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title1: {
    fontSize: 24,
    marginBottom: 10,
    color: '#800000',
    fontWeight: 'bold',
    marginTop: 35,
  },
  title: {
    padding: 10,
    fontSize: 17,
    marginBottom: 10,
    color: '#800000',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
  },
  info: {
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    color: '#800000',
    fontWeight: 'bold',
    marginTop: 0,
  },
  infoValue1: {
    width: 70,
    height: 55,
    backgroundColor: '#c0c0c0',
    paddingHorizontal: 5,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#800000',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
  },
  infoValue2: {
    width: 70,
    height: 55,
    backgroundColor: '#c0c0c0',
    paddingHorizontal: 5,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#800000',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 40,
  },
  infoValue3: {
    width: 50,
    height: 55,
    backgroundColor: '#c0c0c0',
    paddingHorizontal: 5,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#800000',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 40,
  },
  newGameButton: {
    marginTop: 20,
    backgroundColor: '#800000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  targetExpression: {
    fontSize: 18,
    color: '#800000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  hintButton: {
    backgroundColor: '#800000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
});

export default App;