import React from 'react'
import {Collapse , Checkbox } from 'antd'

 const {Panel} = Collapse;

const continents = [
    {
        "_id" : 1,
        "name" : "Africa"
    },
    {
        "_id" : 2,
        "name" : "Europe"
    },

    {
        "_id" : 3, 
        "name" : "Asia"
    },

    {
        "_id" :  4,
        "name" : "North America" 
    },

    {
        "_id" : 5, 
        "name" : "South America" 
    }, 
    {
        "_id" : 6, 
        "name" : "Australia" 
    }, 
    {
        "_id" : 7, 
        "name" : "Antarctica" 
    }, 
]

function CheckBox(props) {

    const renderCheckBox = () => 
        continents.map((value,index) => {
            return (
            <React.Fragment key = {index}>
                <Checkbox
                onChange 
                type = "checkbox" 
                checked 
                
               /> 
               <span>{value.name}</span>

            </React.Fragment>
            )
            console.log(value)
            console.log(index)

        })
    


    return (
        <div>
            <Collapse defaultActiveKey = {['0']}>
                <Panel header key="1">
                    {
                        renderCheckBox()
                }</Panel> 
            </Collapse>            
        </div>
    )
}



export default CheckBox
