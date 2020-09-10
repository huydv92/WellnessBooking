import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';

class LoadingComp extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let showLoading = this.props.loading ? true : false;

        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={showLoading}
                onRequestClose={() => { console.log('close modal') }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            color={"#00979D"} size={"small"}
                            animating={showLoading} />
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

const mapStateToProps = (state) => (
    {
        loading: state.loadingReducer.loading
    }
)

let Loading = connect(mapStateToProps, null)(LoadingComp);
export { Loading };

