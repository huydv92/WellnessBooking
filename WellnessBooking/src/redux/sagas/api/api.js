import axios from 'axios';
import Toast from 'react-native-simple-toast';

export function getAPI(URL, config = {}) {
    console.log("axios.defaults.headers.common")
    console.log(axios.defaults.headers.common)
    return axios
      .get(URL, config)
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          return {
            success: true,
            data
          };
        }
        return {
          success: false,
          resp_status: response.status,
          data
        };
      })
      .catch(parseErrorResponse);
  }
  
  export function postAPI(URL, post, config = {}) {
    console.log(axios.defaults.headers.common)
    return axios
      .post(URL, post, config)
      .then((response) => {
        const { data } = response;
        if (response.status >= 200 || response.status < 300) {
          return {
            success: true,
            data
          };
        }
        return {
          success: false,
          resp_status: response.status,
          data
        };
      })
      .catch(parseErrorResponse);
  }

  const parseErrorResponse = (error) => {
    let message;
    if (error.response && error.response.data && error.response.data instanceof Object) {
      console.log('FULL API ERROR', error.response.data);
      const firstKey = Object.keys(error.response.data)[0];
      message = error.response.data[firstKey];
  
      if (message instanceof Array) {
        message = message[0];
      }
    } else {
      message = error.message;
    }
  
    Toast.show(message, Toast.SHORT);
  
    return {
      success: false,
      error,
      message,
    };
  };