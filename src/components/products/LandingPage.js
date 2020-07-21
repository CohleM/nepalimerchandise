import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { Card ,Col , Row } from 'antd';
import ImageSlider from '../utilities/ImageSlider'
import CheckBox from '../utilities/CheckBox'
const { Meta } = Card;;

function LandingPage() {
    
        const [Products, setProducts] = useState([])
        const [Skip, setSkip] = useState(0)
        const [Limit, setLimit] = useState(8)
        const [PostSize, setPostSize] = useState(0)

        //useEffect is similar to  componentDidMount it executes before loading the actual page 

        const getProducts = (variables) => {
            axios.post('http://localhost:5000/product/getProducts',variables)
            .then(response => {
                if(response.data.success) {
                  //setProducts(response.data.products)   
                    setProducts([...Products, ...response.data.products]) 
                    setPostSize(response.data.postSize)
                   // console.log(response.data.products)
                }
                else {  
                    alert('Failed to fetch the products')
                    console.log(response.err)
                }
            })

        }

        useEffect ( () => {
            const variables = {
            skip : Skip,
            limit : Limit,
        }
            getProducts(variables) 
        },[])


    const onLoadMore = () => {
        let skip = Skip + Limit;
        
        const variables = {
            skip : skip,
            limit : Limit,
        }
        getProducts(variables)
        setSkip(skip);

    }
 
    const renderCards  =  Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} >
            <Card
    hoverable
    style={{ width: '240px' }}
    cover 
  >
    <Meta title={product.title} description={product.price} />
  </Card>
        </Col>
    })


    



    return  (
        <div style = {{ width : '75%', margin : '3rem auto' }}>
            <div style = {{ textAlign : 'center' }}> 
                <h2>Nepali Products</h2>
            </div>
        {/* Filter */} 
        <CheckBox /> 
        {/* Search   */} 

       {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
    
    <br/> 
    <br/>

        {PostSize>= 8 ?
       <div style = {{ display : 'flex' , justifyContent : 'center' }}>
           <button onClick = {onLoadMore}> Load More </button>
       </div>
        : ""
    }


        </div>
    )
}


export default  LandingPage;