import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';



function SearchTickets (props) {
    //const inputText = useRef();
    return (
      <div >
        <input ref = {props.inputText}  />
        <Button   className =' col' onClick ={() => props.searchTickets()}>Seacrh Tickets</Button>
      </div>
    ) 
}

//export default Search;

export default SearchTickets;