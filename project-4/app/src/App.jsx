import  { useEffect, useState } from 'react'
import styled from "styled-components"
import SearchResult from './components/SearchResults/SearchResult';



 export const BASE_URL= "http://localhost:9000";
const App = () => {
  const[data, setData]= useState(null);
  const [loading, setLoading]= useState(false)
  const[error, setError]= useState(null);

  const[filterData, setFilterData]= useState(null)

  const[selectedBtn, setSelectedBtn]= useState("all")



// Too many renders error will be show like this ******
// **********

  // const FetchFoodData= async()=>{
  //   setLoading(true)
  //   try{
  //   const response= await fetch(BASE_URL);

  //   const get =  await response.json();
  //   console.log(get)
  //   setData(get)
  //   setLoading(false)
  //   }catch(error){
  //     setError("unable to fetch data")

  //   }
  // }


  // FetchFoodData();



  useEffect(()=>{

    const FetchFoodData= async()=>{
      setLoading(true)
      try{
      const response= await fetch(BASE_URL);
  
      const get =  await response.json();
      console.log(get)
      setData(get)
      setFilterData(get)
      setLoading(false)
      }catch(error){
        setError("unable to fetch data")
  
      }
    }
  
  
    FetchFoodData();

  },[])




  const searchFood=(e)=>{
    const searchValue= e.target.value;
    // console.log(searchValue)
    if(SearchResult===""){
      setFilterData(null);

    }

  

  const filter= data?.filter((food)=>
  food.name.toLowerCase().includes(searchValue.toLowerCase())

  )
  setFilterData(filter)
  }


  const filterFood=(type)=>{
    if(type==="all"){
      setFilterData(data)
      setSelectedBtn("all")
      return ;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedBtn(type);
  

  }


  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];


  

  if(error) return <div>{error}</div>
  if(loading) return <div>loading.....</div>


  return (
    <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="./logo.svg" alt="logo" />
        </div>

        <div className="search">
          <input onChange={searchFood} placeholder="Search food" />
        </div>



      </TopContainer>

      <FilterContainer>
        {/* without map */}
        {/* /* <Button onclick={()=>filterFOod("all")}>All</Button> */}
        {/* {/* <Button onclick={()=>filterFOod("breakfast")}>All</Button> */}
        {/* {/* <Button onclick={()=>filterFOod("lunch")}>All</Button> */}
        {/* {/* <Button onclick={()=>filterFOod("dinner")}>All</Button> */}
        

{filterBtns.map((value) => (
            <Button
            isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}

      </FilterContainer>


      

      
    </Container>
      <SearchResult  data={filterData}/>
    
    </>
  )
  
}

export default App

  export const Container=styled.div`
max-width: 1200px;
margin: 0 auto;

  `

const TopContainer= styled.section`
min-height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;


.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding:  0 10px;

    &::placeholder{
      color: white;

    }
  }
}

@media  (0<width<600px){
  flex-direction: column;
  height: 120px;


}
    
  `
  
const FilterContainer= styled.section`
display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 50px;
  

`  

 export const Button = styled.button`
background: #ff4343;
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor: pointer;
background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};

&:hover{
  background-color: #c05353;

}

  

`

