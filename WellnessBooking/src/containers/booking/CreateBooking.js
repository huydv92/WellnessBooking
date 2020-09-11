import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
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
      typeOfEvent: "",
      selectedDate: null,
      selectedTime: null,
      isShowDateTimePicker: false,
      mode: 'date'
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
  /**
   * onClosingState() close modal
   * when user swipe will close modal
   */

  onClosingState = () => {
    setTimeout(() => {
      this.setState({ isVisible: false })
    }, 500);
  }

  onChangeText = (text) => {

  }

  onChangeTextDropdown = (text) => {
    this.setState({ typeOfEvent: text })
  }

  //merge and format the date and time state
  formatDate = (date, time) => {
    const newDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    const thedate = newDate && new Date(Date.parse(newDate)) || new Date();
    return thedate;
  };

  /**
   * onChange() change date and time 
   * base on android/ios plaform will give a new datetime value
   */
  onChange = (event, selectedValue) => {
    const { mode } = this.state;
    if (Platform.OS === 'ios') {
      const selectedDate = selectedValue || new Date();
      this.setState({ selectedDate, mode: 'datetime', isShowDateTimePicker: false });
    } else {
      if (mode == 'date') {
        const selectedDate = selectedValue || new Date();
        this.setState({ selectedDate, mode: 'time' });
      } else {
        const selectedTime = selectedValue || new Date();
        this.setState({ selectedTime, mode: 'date', isShowDateTimePicker: false });
      }
    }

  };
//Show date time picker
  showPickerDate = () => {
    this.setState({ isShowDateTimePicker: true })
  }

  createNewBookings = () => {
    alert('ok');
  }

  renderContent() {
    const { selectedDate, isShowDateTimePicker, mode, selectedTime, typeOfEvent } = this.state;
    //get new date base on 2 value selected date and selected time
    const newDate = selectedDate && selectedTime && this.formatDate(selectedDate, selectedTime) || new Date();
    //check typeOfEvent empty or not
    let valueTypeOfEvent = typeOfEvent;
    if (!valueTypeOfEvent || valueTypeOfEvent == "") {
      valueTypeOfEvent = "Please choose type of Event"
    }
    const isShowFullSCreen = (Platform.OS === 'ios') && isShowDateTimePicker;
    return (
      <View style={isShowFullSCreen ? styles.containerIOS : styles.container}>
        {/* view show only title */}
        <View style={styles.containerCal}>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.title}>Create A Booking</Text>
          </View>
          {/* view wrapper all content */}
          <View style={styles.wrapperContent}>
            {/* view show Type Of Event */}
            <View style={styles.viewTitle}>
              <Text style={{ color: '#B7B7B7' }}>Type Of Event</Text>
              <Dropdown
                ref={(target => this.refDropdown = target)}
                style={{ paddingLeft: 5 }}
                inputContainerStyle={{ borderBottomColor: '#00979D' }}
                label=""
                labelHeight={0}
                onChangeText={this.onChangeTextDropdown}
                data={customData}
                value={valueTypeOfEvent}
              />
            </View>
            {/* view show Location of Event */}
            <View style={styles.viewLocation}>
              <Text style={{ color: '#B7B7B7' }}>Location of Event</Text>
              <View style={{ justifyContent: 'center' }}>
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
            {/* view show Confirm Date */}
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: '#B7B7B7' }}>Confirm Date & Time</Text>
              <TouchableOpacity style={styles.customDate} onPress={() => this.showPickerDate()}>
                <View style={styles.confirmDate} >
                  <Text style={styles.dateTime}>{selectedDate ? moment(selectedDate).format("MM-DD-YYYY") : moment().format("MM-DD-YYYY")}</Text>
                </View>
                <Image
                  source={require('../../images/date.png')}
                  style={styles.dateImg}
                  resizeMode="contain" />
              </TouchableOpacity>
              {isShowDateTimePicker && <DateTimePicker
                testID="dateTimePicker"
                value={newDate}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />}
            </View>
            {/* view show Button Create New */}
            {!isShowFullSCreen && <View style={styles.viewButton}>
              <TouchableOpacity style={styles.button} onPress={this.createNewBookings}>
                <Text style={styles.textButton}>Create New</Text>
              </TouchableOpacity>
            </View>}
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { isVisible } = this.state;
    return (
      <Modal
        animationType={'slide'}
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
  containerIOS: {
    height: H - 120,
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
  customDate: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 15,
    fontWeight: '700'
  },
  bodyCal: {
    paddingVertical: 5
  },
  confirmDate: {
    borderColor: '#00979D',
    borderWidth: 1 / 2,
    borderRadius: 5,
    height: 40,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  viewLocation: {
    marginTop: 5
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  },
  dateImg: {
    width: 35,
    height: 35
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
  wrapperContent: {
    width: '100%',
    marginTop: 20
  },
  viewTitle: {
    flexDirection: 'column'
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
    borderColor: '#00979D',
    borderWidth: 1 / 2,
    marginTop: 5,
    padding: 5,
    paddingRight: 30
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
