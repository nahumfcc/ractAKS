import {useState} from 'react';

const CustomNumberInput = (
  {
    name, 
    title = "", 
    placeholder = "", 
    isRequired = false, 
    errorMessage = `El campo ${name} es requerido`,
    min = 0,
    max = 100
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
  
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(errorMessage);
  const [state, setState] = useState(0);
  
  const handleInputBlur = event => {
    if(isRequired && !state){
      setMessage(errorMessage);
      setError(true);
    }
    else{
      validateAge(state);
    }
  };

  const handleValidateNumber = (e) =>{
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) =>{
    setState(e.target.value);
    validateAge(e.target.value);
  };

  const validateAge = (edad) =>{
    if(edad){
      if(min > edad){
        setMessage(`El valor valido mínimo es ${min}`);
        setError(true);
      }
      else if(max < edad){
        setMessage(`El valor valido máximo es ${max}`);
        setError(true);
      }
      else{
        setMessage("");
        setError(false);
      }
    }

  }

  let id = `number-${name}`;

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
      onKeyPress={handleValidateNumber}
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
    >*{message}</label>
    </div>
  )}
  </>);
}

export default CustomNumberInput;
