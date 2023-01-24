import {useState} from 'react';

const CustomTextInput = (
  {
    name, 
    title = "", 
    placeholder = "", 
    isRequired = false, 
    errorMessage = "",
    maxLength = 50
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
  const [state, setState] = useState("");
  
  const handleInputBlur = event => {
    setError(isRequired && !state);
  };

  const handleChange = (e) =>{
    setError(false);
    setState(e.target.value);
  };

  let id = `input-${name}`;

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
      maxLength = {maxLength}
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

export default CustomTextInput;
