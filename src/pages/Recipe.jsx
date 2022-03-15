import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';


export default function Recipe() {
  const [details, setDetails] = useState({})
  const [activeTab, setActiveTab] = useState("instructions")
  let params = useParams();

  const fetchDetails = async(name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)

    const detailsData = await data.json();
    console.log(detailsData);
    setDetails(detailsData);
  };

  useEffect(() => {
    fetchDetails(params.id)
    // so everytime the page loads it will fetch the params again
  }, [params.id])

  return (
    <DetailWrapper>
      <div className="">
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button className={activeTab === "instructions" ? "active" : ""} onClick={() => setActiveTab("instructions")}>Instructions</Button>
        <Button className={activeTab === "ingredients" ? "active" : ""} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
        {activeTab === "instructions" && (
        <div className="">
          <h3 dangerouslySetInnerHTML={{ __html: details.summary}}></h3>
          <h3 dangerouslySetInnerHTML={{ __html: details.instructions}}></h3>
        </div>
        )};

        {activeTab === "ingredients" && (
        <ul>
          {details.extendedIngredients && details.extendedIngredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
        </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}


const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background:#ad641066;
    color: white;
  }
  h4{
    margin-bottom: 2rem;
  }
  li{
    font-size:1.2rem ;
    line-height: 2.5rem;
  }
  ul{
    margin-top: 2rem;
  }
`;


const Button = styled.button`
  padding: 1rem 2rem ;
  color:#313131 ;
  background: white;
  border: 2px solid black ;
  margin-right: 2rem;
  font-weight: 600;
`

const Info = styled.div`
  margin-left: 10rem;
`