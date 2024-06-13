import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpressionBuilder = ({
  numbers,
  operators,
  expression,
  onNumberPress,
  onOperatorPress,
  onReset,
  onCheck,
  usedNumbers,
}) => {
  const renderButtons = () => {
    const renderNumberButtons = () => {
      return numbers.map((number) => (
        <TouchableOpacity
          key={number}
          style={[
            styles.button,
            usedNumbers.includes(number) && styles.usedButton,
          ]}
          onPress={() => {
            if (!usedNumbers.includes(number)) {
              onNumberPress(number);
            }
          }}
          disabled={usedNumbers.includes(number)}
        >
          <Text style={styles.buttonText}>{number}</Text>
        </TouchableOpacity>
      ));
    };

    const renderOperatorButtons = () => {
      return operators.map((operator) => (
        <TouchableOpacity
          key={operator}
          style={styles.button}
          onPress={() => onOperatorPress(operator)}
        >
          <Text style={styles.buttonText}>{operator}</Text>
        </TouchableOpacity>
      ));
    };

    return (
      <View style={styles.buttonContainer}>
        <View style={styles.numberButtons}>{renderNumberButtons()}</View>
        <View style={styles.operatorButtons}>{renderOperatorButtons()}</View>
        <View style={styles.controlButtonContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={onReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={onCheck}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.expressionContainer}>
        <Text style={styles.expression}>{expression}</Text>
      </View>
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
    flex: 1,
  },
  expressionContainer: {
    position: 'center', // Make the container fixed to the viewport
    top: 20, 
    left: 0, // Position it 50 pixels from the left edge of the screen
    width: 200, // Set the width of the container to 300 pixels
    height: 50, 
    marginVertical: -20, // Add a margin below the expression
    backgroundColor: '#c0c0c0', // White background for the expression area
    borderRadius: 5, // Add rounded corners to the expression area
    padding: 20,
    paddingHorizontal: 10, // Add some horizontal padding for better spacing
    paddingVertical: 15, // Add some vertical padding for better spacing
    alignItems:'flex-end',
  },
  expression: {
    fontSize: 20,
    color: '#800000', // Dark gray for the expression text
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20, 
  },
  numberButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding:0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30, 
  },
  operatorButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,

  },
  button: {
    width: 50,
    height: 45,
    margin: 5,
    backgroundColor: '#800000', // Maroon background for all buttons
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, // Make the buttons circula
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // White text for all buttons
    fontWeight: 'bold', // Add some boldness to the button text
  },
  controlButton: {
    width: 80,
    height: 50,
    margin: 5,
    backgroundColor: '#800000', // Dark blue background for control buttons ("Reset" and "Check")
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, // Make the control buttons rounded as well
    fontWeight: 'bold', // Add some boldness to the control button text
    
  },
  controlButtonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 30,

  },
  usedButton: {
    backgroundColor: '#999',
  },
});

export default ExpressionBuilder;