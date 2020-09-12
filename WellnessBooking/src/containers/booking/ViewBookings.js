import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getBookings } from "../../redux/actions/bookingsAction"
import { createBooking } from "../../redux/actions/createBookingAction"
import CreateBooking from '../booking/CreateBooking';
import moment from 'moment';

class ViewBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  /**
  * Lifecycle (componentDidMount)  
  * implement Action getBookings to call API
  */
  componentDidMount() {
    this.getListBookings();
  }

  getListBookings() {
    const { user } = this.props
    const obj = { ['user']: user }
    this.props.getBookings(obj);
  }

  /**
  * Lifecycle (componentDidUpdate) close modal CreateBooking
  */
  componentDidUpdate(prevProps, prevState) {
    const { isSucessBooking } = prevProps;
    if (isSucessBooking) {
      this.refCreateBooking && this.refCreateBooking.close();
    }
  }

  /**
  * Lifecycle (getDerivedStateFromProps)
  * check props new to re-render
  */
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.isFetching){
      return { isFetching: !nextProps.isFetching};
   }
   else return null;
 }

 //refresh list bookings when have any update new
  onRefresh() {
    this.setState({ isFetching: true, }, () => { this.getListBookings() });  
  }

  /**
  * (Action) press Flat Plus Button  
  * this is action open to show modal CreateBooking View
  */
  floatPlusClicked = () => {
    const { user } = this.props
    this.refCreateBooking && this.refCreateBooking.open(user);
  }

  /**
  * (Action) call back from Child   
  * to call action createBooking method to get API
  */
  onCreateBooking = (obj) => {
    this.props.createBooking && this.props.createBooking(obj);
  }

  /**
  * (renderItem) seperate component
  * to show items display for ViewBookings
  */
  renderItem(items) {
    const item = items.item;
    return (
      <View style={styles.cardBody} key={item._id.toString()}>
        <View style={styles.actionTitleWrap}>
          <Text style={styles.textTitle}>{item.event_title}</Text>
        </View>
        <View style={styles.location}>
          <Icon name="location-sharp" size={18} color={"#759BFA"} />
          <View style = {{marginRight:10}}>
            <Text style={styles.actionText}>{item.event_location}</Text>
          </View>
        </View>
        <View style={styles.wrapperDateTime}>
          <View style={styles.actionTimeWrap}>
            <MaterialIcons name="date-range" size={18} color = {"#759BFA"}/>
            <Text style={styles.textDate}>{moment(item.confirmed_datetime).format("DD-MMM-YYYY HH:mm")}</Text>
          </View>
          <Text style={styles.createText}>Created by: {item.created_by}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { listBookings, isSucessBooking } = this.props;
    return (
      <View style={styles.container}>
        {/* show list view bookings */}
        <View style={{ flex: 1 }}>
          {listBookings && listBookings.length > 0 ? <FlatList
            contentContainerStyle={styles.actionWrapper}
            data={listBookings}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}      
            keyExtractor={(item, index) => item._id.toString()}
            renderItem={(items) => this.renderItem(items)}
          /> :
            <View style={styles.viewNoWellness}>
              <Text style={styles.textEmpty}>
                No Wellness Event
            </Text>
            </View>
          }
        </View>
        {/* show float icon */}
        <View style={styles.viewFloatPlus}>
          <TouchableOpacity onPress={() => this.floatPlusClicked()}>
            <Image
              source={require('../../images/plus-icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <CreateBooking
          onCreateBooking={this.onCreateBooking}
          isSucessBooking={isSucessBooking}
          ref={(t) => this.refCreateBooking = t}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  location: {
    flexDirection: 'row',
    marginTop: 3,
    marginLeft: 4
  },
  wrapperDateTime : {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop: 3
  },
  viewNoWellness: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 80,
    height: 80
  },
  viewFloatPlus: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  actionWrapper: {
    padding: 5
  },
  cardBody: {
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginLeft: 5,
    marginRight: 5
  },
  textEmpty: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#00979D'
  },
  actionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionTimeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4
  },
  actionText: {
    fontSize: 14,
    marginLeft: 2
  },
  textDate : {
    fontSize: 13,
    marginLeft: 2,
    fontWeight:'200'
  },
  normalSeparatorLineStyle: {
    height: 1,
    backgroundColor: "#0D4045",
    width: '100%',
    marginTop: 10
  },
  createText: {
    fontSize: 12,
    fontWeight:'200',
    marginLeft: 3
  },
  textTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 3
  },
  eventTitle: {
    marginLeft: 5,
    fontSize: 14
  }
});

const mapStateToProps = ({ auth, bookingsReducer, createBookingReducer }) => (
  console.log(auth, bookingsReducer),
  {
    user: auth && auth.user,
    listBookings: bookingsReducer && bookingsReducer.listBookings,
    isFetching: bookingsReducer && bookingsReducer.isFetching,
    isSucessBooking: createBookingReducer && createBookingReducer.isSucessBooking

  });

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getBookings,
    createBooking
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ViewBookings);