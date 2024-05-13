
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./AuthenticationFunctions";
const Header=()=>{
    const location1=useLocation();
    console.log("location",location1);
    console.log("check authenticated1",isAuthenticated())
    console.log("check authenticated2",localStorage.getItem('authenticatedUser'))
    const navigator=useNavigate();
    const handleLogout=()=>{
        navigator("/");
        localStorage.clear();
        window.location.reload(true);
    }
    
    return(
        <section className="feed-header">
            <div className="row feed-navbar sticky-top px-0 mx-0 py-3">
                <div className="col-1 text-start">
                 {((location1.pathname).includes("/feed/register") || (location1.pathname).includes("/feed/profile"))
                    ? <button onClick={()=>navigator("/")}>
                        <i class="fa-solid fa-arrow-left"></i>
                      </button>
                    :<button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
                        <i className="fa-solid fa-bars"></i>
                    </button>}
                </div>
                <div className="col-11 text-center">
                    <h1>Feeds Application</h1>
                </div>
            </div>
            <div className="offcanvas offcanvas-start py-5" tabindex="-1" id="offcanvasExample" >
                <div className="offcanvas-body">
                    <ul>
                        <>
                            <li><Link to="/feed"><i className="me-2 fa-solid fa-house"></i>Home</Link></li>
                            <li><Link to="/"><i className="me-2 fa-solid fa-power-off"></i>Login</Link></li> 
                        {(isAuthenticated()) ? <li><Link to="/" onClick={handleLogout}><i className="me-2 fa-solid fa-power-off"></i>Logout</Link></li>:<></>}
                        </>
            
                    </ul>
                
                </div>
            </div>
        </section>
    );
};
export default Header;
