import {useState} from 'react';
const Feeds=()=>{
    const [err1,setErr1]=useState("");
    const [myFlag,setMyFlag]=useState(false);
    const [otherFlag,setOtherFlag]=useState(false);
    async function handleViewMyPost()
    {
        setMyFlag(true);
    }
    async function handleViewOtherPost()
    {
        setOtherFlag(true);
    }
    return(
    <>
        <section className="feed-section container-fluid p-5">
            <div className="row row1 mb-5">
                <textarea id="feed-post"></textarea>
                <p className="mb-0" style={{color:"red",fontSize:"10px"}}>{err1}</p>
                <button className="create-post m-5">Create Post</button>
            </div>
            <div className="row">
                <button className="view-my-post mx-5" onClick={handleViewMyPost}>View my Post</button>
                <button className="view-my-post mx-5" onClick={handleViewOtherPost}>View other Post</button>
            </div>
        </section>
        <section className='container-fluid p-5 view-post-section'>
            <div className='row my-post-list' style={{display:(myFlag)?"flex":"none"}}>
                <h3>My Posts</h3>
                <ul>
                    <li>

                    </li>
                </ul>
            </div>
            <div  className='row other-post-list' style={{display:(otherFlag)?"flex":"none"}}>
                <h3>Other's Post</h3>
                <ul>
                    <li>
                        
                    </li>
                </ul>
            </div>
        </section>
    </> )
}
export default Feeds;