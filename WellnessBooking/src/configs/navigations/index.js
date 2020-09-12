import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Login from '../../containers/auth/Login';
import CreateBooking from '../../containers/booking/CreateBooking';
import ViewBookings from '../../containers/booking/ViewBookings';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const optionsHeader = {
    header: () => null,
};

const NavigationState = ({ isLoggedIn }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {!isLoggedIn ? (
                    /** isLoggedIn is false will stay at Login
                     * And true will show Dashboard
                     */
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
                            headerShown: false
                        }}
                    />
                ) : (
                        // User is signed in
                        <Stack.Screen name="View Bookings" component={ViewBookings} />
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const mapStateToProps = (state) => (
    console.log(state),
    {
        isLoggedIn: state.auth.isLoggedIn
    });

let AppWithNavigationState = connect(mapStateToProps, null)(NavigationState);
export default AppWithNavigationState;

