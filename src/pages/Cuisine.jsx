import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([])
  let params = useParams();

  const getCuisine = async(name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=9`)

    const recipes = await data.json();

    setCuisine(recipes.results)
  };

  useEffect(() => {
    getCuisine(params.type)
    // so everytime the page loads it will fetch the params again
  }, [params.type])
  
  return (
    <Grid>
      {cuisine.map((recipe) => {
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

export default Cuisine;