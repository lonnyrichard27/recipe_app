import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom';


export default function Searched() {
  const [searched, setSearched] = useState([])
  let params = useParams();

  const getSearched = async(name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=9`)

    const recipes = await data.json();

    setSearched(recipes.results)
  };

  useEffect(() => {
    getSearched(params.search)
    // so everytime the page loads it will fetch the params again
  }, [params.search])

  return (
    <Grid>
      {searched.map((recipe) => {
        return(
          <Card key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  /* grid-gap: 1rem; */
`;

const Card = styled.div`
  img{
    width: 80%;
    border-radius: 2rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding: 1rem;
  }
`;
