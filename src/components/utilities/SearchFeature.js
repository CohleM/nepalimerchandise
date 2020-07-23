import React, {useState} from 'react'
import {Input} from 'antd'
const  {Search} = Input



function SearchFeature(props) {
    const [SearchItems, setSearchItems] = useState("")
    const updateItems = (event) => {
        //console.log(event.currentTarget.value)
        setSearchItems(event.currentTarget.value)
        props.refreshSearch(event.currentTarget.value)
    }
    return (
        <div>
           <Search 
           value = {SearchItems} 
           onChange = {updateItems}
           placeholder = "Search here" 
           /> 
        </div>
    )
}

export default SearchFeature
