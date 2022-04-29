import styled from 'styled-components'
import DataLogements from '../../data/dataLogements.json'
import colors from '../../utils/style/colors'
import HomeImg from '../../assets/eric-muhr-P_XxsdVgtpQ-unsplash.png'
import { useState, useEffect } from 'react'
import Card from '../../components/Card'
import { Loader } from '../../utils/style/Atoms'


const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 50px;
`
const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  height: 50%;
  padding: 30px;
  object-fit:contain;
  background-image:url(${HomeImg});
  border-radius: 1rem;
  flex: 1;
`
const StyledTitle = styled.h2`
  text-align:center;
  line-height: 50px;
  color:${colors.blackColor};

`
const PageContent = styled.div`
  max-width:100%;
  height:600px;
  margin-top:20px;
  background-color: ${colors.secondary};
  border-radius: 1rem;`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

function Home() {
 const [isDataLoading, setDataLoading] = useState(false)
 const [error, setError] = useState(false)
 const [DataLogements, setDataLogements] = useState([])

useEffect(()=>{
  async function fetchDataLogements(){
    setDataLoading(true)
    try{
      const response = await fetch('DataLogements')
      const {DataLogements} = await response.json()
      setDataLogements(DataLogements)
    }
    catch(err){
      console.log('===== error =====', err)
      setError(true)
    }
    finally{
      setDataLoading(false)
    }
    
  }
  fetchDataLogements()
}, [])

if (error) {
  return <span>Oups! Il y a eu un problème.</span>
}

  return (
    <div>
    <HomeWrapper>
        <PageTitle>
          <StyledTitle>
            Chez vous, partout et ailleurs
          </StyledTitle>
        </PageTitle>
        <PageContent>
        {isDataLoading ? (
           <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ):(
          <CardsContainer>
            {DataLogements.map((profile, index) => (
              <Card
                key={`${profile.name}-${index}`}
                title={profile.title}
                cover={profile.cover}
                pictures={profile.pictures}
                description={profile.description}
                name={profile.host.name}
                picture={profile.host.picture}
                rating={profile.rating}
                location={profile.location}
                equipments={profile.equipments}
                tags={profile.tags}
              />
            ))}
          </CardsContainer>
           )}
        </PageContent>
         
         
        

    </HomeWrapper>
    </div>
  )
}

export default Home

          // {isDataLoading ? (
          //   <LoaderWrapper>
          //     <Loader />
          //   </LoaderWrapper>
          // ):(
          // <CardsContainer>
          //   {DataLogements.map((profile, index) => (
          //     <Card
          //       key={`${profile.name}-${index}`}
          //       title={profile.title}
          //       cover={profile.cover}
          //       pictures={profile.pictures}
          //       description={profile.description}
          //       name={profile.host.name}
          //       picture={profile.host.picture}
          //       rating={profile.rating}
          //       location={profile.location}
          //       equipments={profile.equipments}
          //       tags={profile.tags}
          //     />
          //   ))}
          // </CardsContainer>
          // )}