const initialState = {
  user: '',
  lokasi: '',
  email: '',
  role: '',
  table: 'm_barang_ho',
  telp: '',
}

const setGeneral = (state=initialState, action) => {

  //console.log('masuk bang');
  //console.log(action);

  switch(action.type){
    case "SET_USER":

      return {...state, user: action.data};

    case "SET_LOKASI":

      return {...state, lokasi: action.data};

    case "SET_EMAIL":

      return {...state, email: action.data};

    case "SET_ROLE":

      return {...state, role: action.data};

    case "SET_TABLE":

      return {...state, table: action.data};

    case "SET_TELP":

      return {...state, telp: action.data};

    case "RESET_DATA":

      return state;

    default:
      return state;
  }
}

export default setGeneral;
