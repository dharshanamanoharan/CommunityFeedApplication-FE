import {useState} from 'react';
const Feeds=()=>{
    const [err1,setErr1]=useState("");
    return(
        <section className="feed-section container-fluid p-5">
            <div className="row row1 mb-5">
                <textarea id="feed-post"></textarea>
                <p className="mb-0" style={{color:"red",fontSize:"10px"}}>{err1}</p>
                <button className="create-post m-5">Create Post</button>
            </div>
            <div className="row">
                <button className="view-my-post mx-5">View my Post</button>
                <button className="view-my-post mx-5">View other Post</button>
            </div>
        </section>
    )
}
export default Feeds;