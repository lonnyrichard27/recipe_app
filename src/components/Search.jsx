import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const [input, setInput] = useState('');

  const navigate = useNavigate()

  const submitHandler = (e) => { 
    e.preventDefault();
    navigate(`/searched/${input}`)
  }

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input 
          type="text" 
          onChange={(e) => setInput(e.target.value)} 
          value={input} 
        />
      </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
  margin: 0rem 15rem;
  div{
    position: relative;
    width: 100%;
  }
  input{
    width: 100%;
    border: none;
    background: #ad641066;
    font-size: 1.5rem;
    color:white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 1rem;
    outline:none;
  }
  svg{
    position: absolute;
    top: 40%;
    left:2%;
    transform: translateY(100%, -50%);
    color:white;
  }
`

export default Search;