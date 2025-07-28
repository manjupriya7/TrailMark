import React from "react";
 import './MainHeader.css';

 const MainHeader=props=>{
    return <header className="main-header">{props.children}</header>
//  children is a special prop, automatically passed to every component, that can be used to render the content included between the opening and closing tags when invoking a component. 
};

 export default MainHeader;