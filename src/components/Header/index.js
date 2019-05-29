    import "./header.css";
        import React from "react";

    class Header extends React.Component{
        render(){
            return (
               <nav className="Nav">
                 <div className="Nav-menus">
                   <div className="Nav-brand">
                     <a className="Nav-brand-logo" href="/">

                     </a>
                   </div>
                   <h1 id = 'title'>Fossorgram </h1>
                 </div>
               </nav>
           );
        }
    }
    export default Header;
