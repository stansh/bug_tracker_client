import React from "react";
import {Spinner} from 'reactstrap'

function Loading () {
    return (
        <div>
            <Spinner color="dark" width = '500' className= "mt-5" children = "" />
        </div>
    )
}


export default Loading