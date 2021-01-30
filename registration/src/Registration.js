import React, { Component } from 'react'
import { View, Image, Text,  TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Registration extends Component {
   state = {
     firstNm: '',
     lastNm: '',
     npiNo: '',
     address: '',
     phoneNo: '',
     email: '',
   }

   handleFirstNm = (text) => {
     this.setState({firstNm: text})
   }
   handleLastNm = (text) => {
     this.setState({lastNm: text})
   }
   handleNpiNo = (text) => {
     this.setState({npiNo: text})
   }
   handleAddress = (text) => {
     this.setState({address: text})
   }
   handlePhoneNo= (text) => {
     this.setState({phoneNo: text})
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }

   render() {
      return (
         <View style = {styles.container}>
          <View style={styles.logoContainer}>
           <Image
            style={styles.logo}
            source={{uri: 'https://phimedos.com/wp-content/uploads/2019/08/availity.png'}}
           />
           </View>
           <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "First Name"
              placeholderTextColor = "#262626"
              autoCapitalize = "none"
              onChangeText = {this.handleFirstNm}/>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Last Name"
              placeholderTextColor = "#262626"
              autoCapitalize = "none"
              onChangeText = {this.handleLastNm}/>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "NPI Number"
              placeholderTextColor = "#262626"
              autoCapitalize = "none"
              onChangeText = {this.handleNpiNo}/>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Business Address"
              placeholderTextColor = "#262626"
              autoCapitalize = "none"
              onChangeText = {this.handleAddress}/>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Phone Number"
              placeholderTextColor = "#262626"
              autoCapitalize = "none"
              onChangeText = {this.handlePhoneNo}/>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Email"
              placeholderTextColor = "#262626"
              autoCapitalize = "none"
              onChangeText = {this.handleEmail}/>
            <TouchableOpacity
              style = {styles.submitButton}
            >
              <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Registration

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 500,
    height: 150
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#262626',
    borderWidth: 1,
    padding: 4
  },
  submitButton: {
    backgroundColor: '#2626F3',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center'
  }
})
