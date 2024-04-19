
import { useState, useEffect } from 'react';
import ModeratorNotifications from './ModeratorNotifications';


function ListGroup({model, comments}){
    const [textToxicity, setTextToxicity] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [alertVisible, setAlertVisibility] = useState(false)

    const onClick= ()=> {
        setAlertVisibility(false);
    }

    const predictToxicity = async (index) => {
        setSelectedIndex(index)
        console.log("selectedIndex "+selectedIndex)
        const predictions = await model.classify(comments[index])
        console.log("my prediction "+predictions)
        setTextToxicity(
            predictions
                .filter((item) => item.results[0].match === true)
                .map((item) => item.label)
        )
        console.log("textToxicity "+textToxicity)
        setAlertVisibility(true)
        console.log("visibility "+alertVisible)
    }


    const listItems = comments.map((comment, index) =>
      <li 
        key={index}
        className={selectedIndex===index ? "list-group-item active":"list-group-item"}
        onClick={async()=>await predictToxicity(index)}      
      >
        {comment}
    </li>)
    return (
        <>
            {alertVisible && <ModeratorNotifications text={textToxicity} onClick={onClick}></ModeratorNotifications>}
            <ul className="list-group">{listItems}</ul>
        </>
        
    );
};

export default ListGroup;