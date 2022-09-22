/**
 * Simple bleno echo server
 * Author: Shawn Hymel
 * Date: November 22, 2015
 *
 * Creates a Bluetooth Low Energy device using bleno and offers one service
 * with one characteristic. Users can use a BLE test app to read, write, and
 * subscribe to that characteristic. Writing changes the characteristic's
 * value, reading returns that value, and subscribing results in a string
 * message every 1 second.
 *
 * This example is Beerware (https://en.wikipedia.org/wiki/Beerware).
 */

// Using the bleno module
var bleno = require('bleno');

// Once bleno starts, begin advertising our BLE address
bleno.on('stateChange', function (state) {
    console.log('State change: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising('myDevice', ['91D8C8EE-1CEC-C011-0CC6-96E587067819']);
    } else {
        bleno.stopAdvertising();
    }
});

// Notify the console that we've accepted a connection
bleno.on('accept', function (clientAddress) {
    console.log("Accepted connection from address: " + clientAddress);
});

// Notify the console that we have disconnected from a client
bleno.on('disconnect', function (clientAddress) {
    console.log("Disconnected from address: " + clientAddress);
});

bleno.on('servicesSet', (error) => {
    console.log("service set:", error);
});

bleno.on('servicesSetError', (error) => {
    console.log("service set:", error);
});

var myvalue = { MID: "MachineDeviceName1", "t": "2020-08-24 14:34:45", "n_s": 135, n_d: 94, n_pr: 78, pr: 78, sp: 99, temp: 38.5 }
var myinterval;
// When we begin advertising, create a new service and characteristic
bleno.on('advertisingStart', function (error) {
    if (error) {
        console.log("Advertising start error:" + error);
    } else {
        console.log("Advertising start success");
        bleno.setServices([

            // Blood Pressure Service
            new bleno.PrimaryService({
                uuid: '1810',
                characteristics: [

                    // Define a new characteristic within that service
                    new bleno.Characteristic({
                        value: null,
                        uuid: '2a35',
                        properties: ['notify', 'read', 'write'],

                        // If the client subscribes, we send out a message every 1 second
                        onSubscribe: function (maxValueSize, updateValueCallback) {
                            console.log("Device subscribed");
                            myinterval = setInterval(function () {
                                updateValueCallback(new Buffer("120"));
                                //updateValueCallback(new Buffer("HI"))
                            }, 1000);
                        },

                        // If the client unsubscribes, we stop broadcasting the message
                        onUnsubscribe: function () {
                            console.log("Device unsubscribed");
                            clearInterval(myinterval);
                        },

                        // Send a message back to the client with the characteristic's value
                        onReadRequest: function (offset, callback) {
                            console.log("Read request received");
                            callback(this.RESULT_SUCCESS, new Buffer("120"));
                        },

                        // Accept a new value for the characterstic's value
                        onWriteRequest: function (data, offset, withoutResponse, callback) {
                            this.value = data;
                            console.log('Write request: value = ' + this.value.toString("utf-8"));
                            callback(this.RESULT_SUCCESS);
                        }

                    })

                ]
            }),
            // Heart Rate
            new bleno.PrimaryService({
                //uuid : '12ab',
                uuid: '180d',
                characteristics: [

                    // Define a new characteristic within that service
                    new bleno.Characteristic({
                        value: null,
                        uuid: '2a37',
                        properties: ['notify', 'read', 'write'],

                        // If the client subscribes, we send out a message every 1 second
                        onSubscribe: function (maxValueSize, updateValueCallback) {
                            console.log("Device subscribed");
                            myinterval = setInterval(function () {
                                updateValueCallback(new Buffer("61"));
                                //updateValueCallback(new Buffer("HI"))
                            }, 1000);
                        },

                        // If the client unsubscribes, we stop broadcasting the message
                        onUnsubscribe: function () {
                            console.log("Device unsubscribed");
                            clearInterval(myinterval);
                        },

                        // Send a message back to the client with the characteristic's value
                        onReadRequest: function (offset, callback) {
                            console.log("Read request received");
                            callback(this.RESULT_SUCCESS, new Buffer("61"));
                        },

                        // Accept a new value for the characterstic's value
                        onWriteRequest: function (data, offset, withoutResponse, callback) {
                            this.value = data;
                            console.log('Write request: value = ' + this.value.toString("utf-8"));
                            callback(this.RESULT_SUCCESS);
                        }

                    })
                ]
            }),
            // Pulse Oximeter
            new bleno.PrimaryService({
                //uuid : '12ab',
                uuid: '1822',
                characteristics: [

                    // Define a new characteristic within that service
                    new bleno.Characteristic({
                        value: null,
                        uuid: '2a5f',
                        properties: ['notify', 'read', 'write'],

                        // If the client subscribes, we send out a message every 1 second
                        onSubscribe: function (maxValueSize, updateValueCallback) {
                            console.log("Device subscribed");
                            myinterval = setInterval(function () {
                                updateValueCallback(new Buffer("80"));
                                //updateValueCallback(new Buffer("HI"))
                            }, 1000);
                        },

                        // If the client unsubscribes, we stop broadcasting the message
                        onUnsubscribe: function () {
                            console.log("Device unsubscribed");
                            clearInterval(myinterval);
                        },

                        // Send a message back to the client with the characteristic's value
                        onReadRequest: function (offset, callback) {
                            console.log("Read request received");
                            callback(this.RESULT_SUCCESS, new Buffer("80"));
                        },

                        // Accept a new value for the characterstic's value
                        onWriteRequest: function (data, offset, withoutResponse, callback) {
                            this.value = data;
                            console.log('Write request: value = ' + this.value.toString("utf-8"));
                            callback(this.RESULT_SUCCESS);
                        }
                    })
                ]
            }),
            // Health Thermometer
            new bleno.PrimaryService({
                //uuid : '12ab',
                uuid: '1809',
                characteristics: [

                    // Define a new characteristic within that service
                    new bleno.Characteristic({
                        value: null,
                        uuid: '2a1c',
                        properties: ['notify', 'read', 'write'],

                        // If the client subscribes, we send out a message every 1 second
                        onSubscribe: function (maxValueSize, updateValueCallback) {
                            console.log("Device subscribed");
                            myinterval = setInterval(function () {
                                updateValueCallback(new Buffer("36"));
                                //updateValueCallback(new Buffer("HI"))
                            }, 1000);
                        },

                        // If the client unsubscribes, we stop broadcasting the message
                        onUnsubscribe: function () {
                            console.log("Device unsubscribed");
                            clearInterval(myinterval);
                        },

                        // Send a message back to the client with the characteristic's value
                        onReadRequest: function (offset, callback) {
                            console.log("Read request received");
                            callback(this.RESULT_SUCCESS, new Buffer("36"));
                        },

                        // Accept a new value for the characterstic's value
                        onWriteRequest: function (data, offset, withoutResponse, callback) {
                            this.value = data;
                            console.log('Write request: value = ' + this.value.toString("utf-8"));
                            callback(this.RESULT_SUCCESS);
                        }
                    })
                ]
            })
        ]);
    }
});
