import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  Image,
  TouchableOpacity} from 'react-native';
import Modal from 'react-native-modalbox';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

const customData = [
  { value: '1', label: 'Health Talk' },
  { value: '2', label: 'Wellness Events' },
  { value: '3', label: 'Fitness Activities' }
];


class CreateBooking extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      typeOfEvent : ""
    }
  }

  close = () => {
    this.setState({
      isVisible: false
    })
  }

  open = () => {
    this.setState({
      isVisible: true
    })
  }

  onClosingState = () => {
    setTimeout(() => {
      this.setState({ isVisible: false })
    }, 500);
  }

  onChangeText = (text) => {

  }

  onChangeTextDropdown = (text) => {
    this.setState({typeOfEvent: text})
  }

  closeAll = () => {
    this.setState({
      isVisible: false
    });
  }

  renderContent() {
    const currentDate = moment(new Date()).format("YYYY-MM-DD");
    let {typeOfEvent} = this.state;
    if (!typeOfEvent || typeOfEvent == "") {
      typeOfEvent = "Please choose type of Event"
    }
    return (
      <View style={styles.container}>
        <View style={styles.containerCal}>
          <View style = {{marginTop: 15}}>
            <Text style={styles.title}>Create A Booking</Text>
          </View>
          <View style={styles.viewTitle}>
            <Text style={{color: '#B7B7B7'}}>Type Of Event</Text>
            <Dropdown
              ref={(target => this.refDropdown = target)}
              inputContainerStyle={{ borderBottomColor: '#00000077' }}
              label=""
              labelHeight={0}
              onChangeText={this.onChangeTextDropdown}
              data={customData}
              value = {typeOfEvent}
            />
            <View style={styles.viewLocation}>
              <Text style={{color: '#B7B7B7'}}>Location of Event</Text>
              <View style = {{justifyContent:'center'}}>
                <TextInput
                  style={styles.inputStyle}
                  onChange={(value) => this.onChangeText(value)}
                />
                <Image
                  source={require('../../images/location.png')}
                  style={styles.locationImg}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color: '#B7B7B7'}}>Confirm Date & Time</Text>
              <DatePicker
                style={{ width: '100%', marginTop: 5, padding: 10 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={moment(new Date()).format("YYYY-MM-DD")}
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </View>
            <View style={styles.viewButton}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>ADD NEW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { isVisible } = this.state;
    return (
      <Modal
        animationType={'fade'}
        isOpen={isVisible}
        swipeToClose={isVisible}
        swipeArea={500}
        onClosingState={this.onClosingState}
        style={{ backgroundColor: 'transparent' }}
      >
        {this.renderContent()}
      </Modal>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: H * 2 / 3,
    left: 0,
    right: 0,
    top: 20,
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    alignItems: 'center'
  },
  bodyCal: {
    paddingVertical: 5
  },
  viewLocation: {
    marginTop: 5
  },
  textButton: {
    color: "white",
    fontWeight: "bold"
  },
  locationImg: {
    position: "absolute",
    right: 10,
    width: 20,
    height: 15
  },
  viewButton: {
    width: '100%',
    height: 60,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewTitle : {
    width: '100%',
    marginTop: 20 
  },
  containerCal: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // justifyContent:'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  inputStyle: {
    display: 'flex',
    minHeight: 40,
    borderRadius: 5,
    textAlignVertical: 'center',
    borderColor: '#00000077',
    borderWidth: 1/2,
    marginTop: 5,
    padding: 5
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#00979D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }

});
export default CreateBooking;
