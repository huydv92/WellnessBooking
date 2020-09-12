import React, { PureComponent } from 'react';
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

const dataEvents = [
  { value: '0', label: 'Health Talk' },
  { value: '1', label: 'Wellness Events' },
  { value: '2', label: 'Fitness Activities' }
];


class CreateBooking extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      typeOfEvent: "",
      selectedDate: null,
      selectedTime: null,
      isShowDateTimePicker: false,
      mode: 'date',
      location: '',
      userName: '',
      errorTypeOfEvent: '',
      errorLocation: ''
    }
  }

  /**
   * resetState() close modal
   * reset state and clear data
   */
  resetState() {
    this.setState({
      isVisible: false,
      typeOfEvent: "",
      selectedDate: null,
      selectedTime: null,
      isShowDateTimePicker: false,
      mode: 'date',
      location: '',
      userName: '',
      errorTypeOfEvent: '',
      errorLocation: ''
    })
  }

  close = () => {
    this.resetState();
  }

  open = (userName) => {
    this.setState({
      isVisible: true,
      userName
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

  onChangeText = (location) => {
    this.setState({ location, errorLocation: '' });
  }

  onChangeTextDropdown = (text) => {
    this.setState({ typeOfEvent: text, errorTypeOfEvent: '' })
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
   * if (Android) will change from date to time after press done
   * if (IOS) just keep datetime picker
   */
  onChange = (event, selectedValue) => {
    if (event.type === 'dismissed') {
      this.setState({ isShowDateTimePicker: false, mode: 'date' });
    } else {
      if (Platform.OS === 'ios') {
        this.setState({ selectedDate: selectedValue, mode: 'datetime' });
      } else {
        this.onChangePicker(selectedValue);
      }
    }
  };

  onChangePicker(selectedValue) {
    const { mode } = this.state;
    if (mode == 'date') {
      const selectedDate = selectedValue || new Date();
      this.setState({ selectedDate, mode: 'time' });
    } else {
      const selectedTime = selectedValue || new Date();
      //compare ios or android if (iOS) just need selected Time
      this.setState({ selectedTime, mode: 'date', isShowDateTimePicker: false });
    }
  }

  /**
  * only (IOS)  clickedDonePickcer() 
  * press Done to hide Picker date
  */
  clickedDonePickcer = () => {
    this.setState({ isShowDateTimePicker: false, mode: 'date' });
  }

  /**
    * only (IOS) clickedDonePickcer() 
    * press Done to hide Picker date
    */
  clickedCancelPickcer = () => {
    this.setState({ selectedDate: null, selectedTime: null, mode: 'date', isShowDateTimePicker: false });
  }

  //show date time picker
  showPickerDate = () => {
    this.setState({ isShowDateTimePicker: true })
  }

  //(Action): Create New a booking Wellness
  createNewBookings = () => {
    const { selectedDate, selectedTime, location, typeOfEvent, userName } = this.state;
    //check if ios just need selectedDate and android is both
    const newDate = selectedDate ? (Platform.OS === 'ios') ? selectedDate : this.formatDate(selectedDate, selectedTime) : new Date();
    //parse time to string for confirmDate
    const parseTimeToString = moment(newDate).format("YYYY-MM-DD HH:mm:ss");
    //parse time to string to get currentDate
    const parseCurrentDateToString = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    //validate
    this.validate(typeOfEvent, location, parseTimeToString, parseCurrentDateToString, userName);
  }

  //validate event before send to server
  validate(event, location, confirmDate, createAt, createBy) {
    if (event === '') {
      this.setState({ errorTypeOfEvent: 'Please choose type of event' })
    } else if (location === '') {
      this.setState({ errorLocation: 'Please input location of event' })
    } else {
      //get string of dropdown event
      const strEvent = dataEvents[parseInt(event)];
      const valueEvent = strEvent.label;
      const createObj = {
        event_title: valueEvent,
        event_location: location,
        confirmed_datetime: confirmDate,
        created_at: createAt,
        created_by: createBy
      }
      this.props.onCreateBooking && this.props.onCreateBooking(createObj);
    }
  }

  //show confirmDate View
  renderConfirmDate() {
    const { selectedDate, isShowDateTimePicker, mode, selectedTime } = this.state;
    //get new date base on 2 value selected date and selected time
    let newDate;
    if (Platform.OS === 'ios') {
      newDate = selectedDate || new Date();
    } else {
      newDate = selectedDate && selectedTime && this.formatDate(selectedDate, selectedTime) || new Date();
    }
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: '#B7B7B7' }}>Confirm Date & Time</Text>
        <TouchableOpacity style={styles.customDate} onPress={() => this.showPickerDate()}>
          <View style={styles.confirmDate} >
            <Text style={styles.dateTime}>
              {newDate ? moment(newDate).format("DD-MMM-YYYY HH:mm") : moment().format("DD-MMM-YYYY HH:mm")}
            </Text>
          </View>
          <Image source={require('../../images/date.png')} style={styles.dateImg} resizeMode="contain" />
        </TouchableOpacity>
        {Platform.OS === 'ios' && isShowDateTimePicker && <View style={styles.stylesSelectedPicker}>
          <TouchableOpacity onPress={this.clickedDonePickcer}>
            <Text style={styles.textPicker}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.clickedCancelPickcer}>
            <Text style={styles.textPicker}>Cancel</Text>
          </TouchableOpacity>
        </View>}
        { isShowDateTimePicker && <View style={styles.viewPicker}>
          <DateTimePicker
            testID="dateTimePicker"
            value={newDate}
            mode={(Platform.OS === 'ios') ? 'datetime' : mode}
            is24Hour={true}
            minimumDate={new Date()}
            display="default"
            onChange={this.onChange}
          />
        </View>
        }
      </View>
    )
  }

  //render type of event view
  renderTypeEvent() {
    const { typeOfEvent, errorTypeOfEvent } = this.state;
    //check typeOfEvent empty or not
    let valueTypeOfEvent = typeOfEvent;
    if (!valueTypeOfEvent || valueTypeOfEvent == "") {
      valueTypeOfEvent = "Please choose type of Event"
    }
    return (
      <View style={styles.viewTitle}>
        <Text style={{ color: '#B7B7B7' }}>Type Of Event</Text>
        <Dropdown
          ref={(target => this.refDropdown = target)}
          style={{ paddingLeft: 5 }}
          inputContainerStyle={!!errorTypeOfEvent ? { borderBottomColor: 'red', borderBottomWidth: 1 } : { borderBottomColor: '#00979D' }}
          label=""
          labelHeight={0}
          onChangeText={this.onChangeTextDropdown}
          data={dataEvents}
          value={valueTypeOfEvent}
        />
        {!!errorTypeOfEvent && <Text style={styles.errorStyle}>{errorTypeOfEvent}</Text>}
      </View>
    )
  }

  //render location view
  renderLocation() {
    const { location, errorLocation } = this.state;
    return (
      <View style={styles.viewLocation}>
        <Text style={{ color: '#B7B7B7' }}>Location of Event</Text>
        <View style={{ justifyContent: 'center' }}>
          <TextInput
            style={errorLocation ? styles.inputStyleError : styles.inputStyle}
            onChangeText={(value) => this.onChangeText(value)}
            value={location}
          />
          <Image
            source={require('../../images/location.png')}
            style={styles.locationImg}
            resizeMode="contain"
          />
          {!!errorLocation && <Text style={styles.errorStyle}>{errorLocation}</Text>}
        </View>
      </View>
    )
  }

  /** 
  * (Render) content includes event, location, confirmdate
  */
  renderContent() {
    const { isShowDateTimePicker } = this.state;
    const isShowFullSCreen = (Platform.OS === 'ios') && isShowDateTimePicker;
    return (
      <View style = {{flex: 1}}>
        <View style={isShowFullSCreen ? styles.containerIOS : styles.container}>
          {/* view show only title */}
          <View style={styles.containerCal}>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.title}>Create A Booking</Text>
            </View>
            {/* view wrapper all content */}
            <View style={styles.wrapperContent}>
              {/* view show Type Of Event */}
              {this.renderTypeEvent()}
              {/* view show Location of Event */}
              {this.renderLocation()}
              {/* view show Confirm Date */}
              {this.renderConfirmDate()}
              {/* view show Button Create New */}
              {!isShowFullSCreen && <View style={styles.viewButton}>
                <TouchableOpacity style={styles.button} onPress={this.createNewBookings}>
                  <Text style={styles.textButton}>Create New</Text>
                </TouchableOpacity>
              </View>}
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
        animationType={'slide'}
        isOpen={isVisible}
        swipeToClose={isVisible}
        swipeArea={500}
        position="center"
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
  errorStyle: {
    color: 'red',
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
  viewPicker: {
    width:'100%',
    maxHeight:250
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
    bottom: 12,
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
  inputStyleError: {
    display: 'flex',
    minHeight: 40,
    borderRadius: 5,
    textAlignVertical: 'center',
    borderColor: 'red',
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
  },
  stylesSelectedPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textPicker: {
    color: 'blue',
    fontWeight: '500'
  }

});
export default CreateBooking;
