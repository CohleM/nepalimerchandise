import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { Card ,Col , Row } from 'antd';

const { Meta } = Card;;

function LandingPage() {
    
        const [Products, setProducts] = useState([])
   //useEffect is similar to  componentDidMount it executes before loading the actual page 
    useEffect ( () => {
      
        axios.post('http://localhost:5000/product/getProducts',)
            .then(response => {
                if(response.data.success) {
                    setProducts(response.data.products)                
                    console.log(response.data.products)
                }
                else {  
                    alert('Failed to fetch the products')
                    console.log(response.err)
                }
            })
            
    },[])

 
    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>,
        </Col>
    })




    return  (
        <div style = {{ width : '75%', margin : '3rem auto' }}>
            <div style = {{ textAlign : 'center' }}> 
                <h2>Nepali Products</h2>
            </div>
        {/* Filter */} 

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
       <div style = {{ display : 'flex' , justifyContent : 'center' }}>
           <button> Load More </button>
       </div>


        </div>
    )
}


export default  LandingPage;