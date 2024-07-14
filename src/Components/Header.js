
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated , isAuthorized } from "./AuthenticationFunctions";
const Header=()=>{
    const location1=useLocation();
    //console.log("check authenticated1-Boolean Result",isAuthenticated());
    //console.log("check authenticated2-LoggedIn userName",localStorage.getItem('authenticatedUser'));
    //console.log("check authorized1-Boolean Result",isAuthorized())
    const navigator=useNavigate();
    const handleLogout=()=>{
        navigator("/");
        localStorage.clear();
        window.location.reload(true);
    }
    
    return(
        <section className="feed-header">
            <div className="row feed-navbar sticky-top px-0 mx-0">
               <div>
                    <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
                        <i className="fa-solid fa-bars me-3"></i><span style={{color:"#f4715a",fontWeight:"bold"}}>Feed Buzz</span>
                    </button>
                </div>
            </div>
            <div className="offcanvas offcanvas-start pt-2 pb-5" tabindex="-1" id="offcanvasExample" >
                <div className="offcanvas-body">
                <a className="navbar-brand"><Link to="/"><img src={"../feedBuzzLogo.png"} className="img-fluid" style={{height:"70px",width:"70px"}}/>FeedBuzz</Link></a>
                    <ul className="px-0">
                        <>
                            <li><Link to="/feed"><i className="me-2 fa-solid fa-house"></i>Home</Link></li>
                            {(isAuthenticated()=== true) ? <li><Link to="/feed/publicFeed"><i class="me-2 fa-solid fa-rss"></i>Public Feed</Link></li>:<></>}
                            {(isAuthenticated()=== true) ? <li><Link to="/feed/myActivity"><i class="me-2 fa-solid fa-chart-line"></i>My Activity</Link></li>:<></>}
                            {(isAuthenticated()=== true) ? <></>:    <li><Link to="/"><i className="me-2 fa-solid fa-power-off"></i>Login</Link></li> }
                            {(isAuthorized()=== true) ? <li><Link to="/adminPanel"><i class="me-2 fa-solid fa-user-tie"></i>Admin Panel</Link></li> : <></>}
                            {(isAuthenticated()=== true) ? <li><Link to="/" onClick={handleLogout}><i className="me-2 fa-solid fa-power-off"></i>Logout</Link></li>:<></>}
                        </>
                    </ul>
                
                </div>
            </div>
        </section>
    );
};
export default Header;
