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
          setTimeout(function(){ Toast.show(data, Toast.LONG); }, 100);
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


 export async function viewBookingsAPI(url,params) {
   const user = params;
    console.log(params)
   let res = await axios({
      method: 'post',
      url: url,
      data: {"user": params.user },
      validateStatus: (status) => {
        return status;
      },
    }).then(response => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
    return res;
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
      message = error.response.data;
    }
    setTimeout(function(){ Toast.show(message, Toast.SHORT); }, 100);
  
    return {
      success: false,
      error,
      message,
    };
  };

  