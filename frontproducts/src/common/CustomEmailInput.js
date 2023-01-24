import {useState} from 'react';

const CustomEmailInput = (
  {
    name, 
    title = "", 
    placeholder = "", 
    isRequired = false, 
  }) =>{
  
  const rowStyle = {
    content: "",
    display: 'table',
    clear: 'both'
  }

  const columnStyle = {
    float: 'left',
    width: '50%',
  }
  
  let regex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
  const errorRequired = 'El correo es requerido';
  const errorFormat = 'El correo no esta en el formato adecuado correo@mail.com';

  const [error, setError] = useState(false);
  const [state, setState] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleInputBlur = event => {
    if(isRequired && !state){
      setError(true);
      setErrorMessage(errorRequired);
    }
    else if(!regex.test(state)){
      setError(true);
      setErrorMessage(errorFormat);
    }
    else{
      setError(false);
      setErrorMessage("");
    }
  };

  const handleChange = (e) =>{
    setState(e.target.value);

    if(!regex.test(e.target.value)){
      setError(true);
      setErrorMessage(errorFormat);
    }
    else{
      setError(false);
      setErrorMessage("");
    }
  };

  let id = `email-${name}`;

  return(<>
  <div style={rowStyle}>
    <div style={columnStyle} >
      <label htmlFor="{id}">{title} </label>
    </div>
    <div style={columnStyle}>
      <input 
      style={error?{borderColor:'red'}:{}}
      name="{id}"
      id="{id}"
      value={state}
      onChange={handleChange}
      onBlur={handleInputBlur}
      placeholder={placeholder}
      />
    </div>    
  </div>
  {error && (
    <div style={rowStyle}>
      <label 
    style={{color:'red', fontSize:'60%', fontWeight:'Bold'}}
    htmlFor="{id}"    
    >*{errorMessage}</label>
    </div>
  )}
  </>);
}

export default CustomEmailInput;
