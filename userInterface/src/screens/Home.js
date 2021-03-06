import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import * as firebase from 'firebase';
import { LoginButton } from '../components/loginButton';


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {        
            licenseData: [],
            faceData: [],
        }
    }

    padding(top, bottom) {
        return {
            paddingTop: top,
            paddingBottom: bottom
        }
    }

    componentDidMount() {
        var faceData = firebase.database().ref().child('/people');
        faceData.on('value', snap => {
            var newFaces = [];
            for (var key in snap.val()) {
                var currFace = {};
                currFace.Person = snap.val()[key].person;
                currFace.Time = snap.val()[key].time;
                newFaces.unshift(currFace);
            }
            this.setState({faceData: newFaces});
        })

        var plateData = firebase.database().ref().child('/plates');
        plateData.on('value', snap => {
            var newPlates = [];
            for (var key in snap.val()) {
                var currPlate = {};
                currPlate.Plate = snap.val()[key].plate;
                currPlate.Time = snap.val()[key].time;
                newPlates.unshift(currPlate);
            }
            this.setState({licenseData: newPlates});
        })
    }

    onPressLogOut(props) {
        const {navigate} = props.navigation;
        navigate('LoginPage');
    }

    render(props) {
        return (
            <View style={styles.background}>
                <Text style={styles.header}>Recent Activity</Text>
                <Text style={styles.subheader}>Vehicles</Text>
                <View>
                    <View style={styles.columnHead}>
                        <Text style={styles.text}>License Plate</Text>
                        <Text style={styles.timestampText}>Timestamp</Text>
                    </View>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={this.state.licenseData}
                    renderItem={({ item }) => (
                        <View style={styles.flatListTable}>
                            <Text style={styles.text}>{item.Plate}</Text>
                            <Text style={styles.timestampText}>{item.Time}</Text>
                        </View>
                    )}
                />

                <Text style={styles.subheader}>Recognized People</Text>
                <View>
                    <View style={styles.columnHead}>
                        <Text style={styles.text}>ID</Text>
                        <Text style={styles.timestampText}>Timestamp</Text>
                    </View>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={this.state.faceData}
                    renderItem={({ item }) => (
                        <View style={styles.flatListTable}>
                            <Text style={styles.text}>{item.Person}</Text>
                            <Text style={styles.timestampText}>{item.Time}</Text>
                        </View>
                    )}
                />
                
            </View>
        )
    }

};

const styles = StyleSheet.create({
    background: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    header: {
        fontSize: 25,
        fontWeight: '600',
        paddingBottom: 20,
        paddingTop: 20
    },
    subheader: {
        fontSize: 18,
        fontWeight: '400',
        paddingBottom: 10,
        color: '#23374D'
    },
    columnHead: {
        backgroundColor: '#1089FF',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 2,
        borderColor: '#23374D',
        flexDirection: "row",
    },
    text: {
        padding: 5,
        textAlign: 'center',
        width: 120
    },
    timestampText: {
        padding: 5,
        textAlign: 'center',
        width: 180
    },
    flatList: {
        backgroundColor: '#1089FF',
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#23374D',
        maxHeight: 160,
        marginBottom: 30,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    flatListTable: {
        flexDirection: 'row'
    },
    mainElement: {
        paddingBottom: 20,
        paddingTop: 20
    }
});