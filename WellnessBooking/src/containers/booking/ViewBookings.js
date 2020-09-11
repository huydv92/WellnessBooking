import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getBookings } from "../../redux/actions/bookingsAction"
import CreateBooking from '../booking/CreateBooking';

class viewBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { user } = this.props
    const obj = { ['user']: user }
    this.props.getBookings(obj);
  }

  floatPlusClicked = () => {
    this.refCreateBooking && this.refCreateBooking.open();
  }


  renderItem(items) {
    const item = items.item;
    return (
      <View style={styles.action} key={item._id.toString()}>
        <View style={styles.actionTitleWrap}>
          <Text style = {styles.eventTitle}>Event title:</Text>
          <Text style={styles.textTitle}>{item.event_title}</Text>
        </View>
        <View style={styles.location}>
          <Icon name="location" size={25} />
          <Text style={styles.actionText}>{item.event_location}</Text>
        </View>
        <View style={styles.actionTimeWrap}>
          <MaterialIcons name="date-range" size={25} />
          <Text style={styles.actionText}>{item.confirmed_datetime}</Text>
        </View>
        <Text style={styles.createText}>Created by : {item.created_by}</Text>
        <View style={styles.normalSeparatorLineStyle} />
      </View>
    )
  }

  render() {
    const { listBookings } = this.props;
    const { isShowCreateBooking } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {listBookings && listBookings.length > 0 ? <FlatList
            contentContainerStyle={styles.actionWrapper}
            data={listBookings}
            keyExtractor={(item, index) => item._id.toString()}
            renderItem={(items) => this.renderItem(items)}
          /> : 
          <View style = {styles.viewNoWellness}>
            <Text style={styles.textEmpty}>
                 No Wellness Event
            </Text>
            </View>
          }
        </View>
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
    alignItems: 'center'
  },
  viewNoWellness: {
    flex:1,
     alignItems:'center', 
     justifyContent:'center'
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
  action: {
    justifyContent: 'center',
    margin: 5
  },
  textEmpty: {
    fontWeight:'bold', 
    fontSize: 25, 
    color:'#00979D'
  },
  actionTitleWrap: {
    flexDirection:'row',
    alignItems:'center'
  },
  actionTimeWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionText: {
    fontSize: 14,
    marginLeft: 2
  },
  normalSeparatorLineStyle: {
    height: 1,
    backgroundColor: "#0D4045",
    width: '100%',
    marginTop: 10
  },
  createText: {
    fontSize:13,
    fontStyle: 'italic',
    marginLeft: 3
  },
  textTitle: {
    fontSize:15,
    fontWeight:'bold',
    marginLeft: 5
  },
  eventTitle: {
    marginLeft: 5,
    fontSize: 14
  }
});

const mapStateToProps = ({auth, bookingsReducer}) => (
  console.log(auth, bookingsReducer),
  {
    user: auth && auth.user,
    listBookings: bookingsReducer && bookingsReducer.listBookings
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getBookings
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(viewBookings);