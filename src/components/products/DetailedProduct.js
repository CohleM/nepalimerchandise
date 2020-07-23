import React, {useState,useEffect} from 'react'
import axios from 'axios'
function DetailedProduct(props) {

    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])
    useEffect(() => {
        axios.get(`/product/product_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })


    }, [])
    return (
        <div>
            productPage
            {console.log(props.match.params.productId)}
        </div>
    )
}

export default DetailedProduct
