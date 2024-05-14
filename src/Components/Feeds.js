import {useState} from 'react';
import axios from 'axios';
const Feeds=()=>{
    //For error handling
    const [err1,setErr1]=useState("");
    const [createMsg,setCreateMsg]=useState("")
    const [myFlag,setMyFlag]=useState(false);
    const [otherFlag,setOtherFlag]=useState(false);
    //For viewing posts
    const [myPosts,setMyPosts]=useState([]);
    const [allPosts,setAllPosts]=useState([]);
    //Post Model
    const user_Id=localStorage.getItem("userId");
    const [userId,setUserId]=useState(user_Id);
    const [postId,setPostId]=useState("");
    const date1=new Date().toISOString().split('T')[0];
    const [postDate,setPostDate]=useState(date1);
    const postAuthor=localStorage.getItem("authenticatedUser");
    const [postCreator,setPostCreator]=useState(postAuthor);
    const [postDesc,setPostDesc]=useState("");
    const [postStatus,setPostStatus]=useState("pending");
    //Handling post creation
    async function handleCreate()
    {
        setErr1("");
        setCreateMsg("");
        var flag1;
        (postDesc.trim()==="" || postDesc.length<15)?setErr1("Your post must contain atleast 15 characters"): flag1=true;
        if(flag1 === true)
        {
            try
            {
                const res1=await axios.post("http://localhost:8080/feed/user/createPost",
                    {
                        userId,
                        postId,
                        postDate,
                        postCreator,
                        postStatus
                    }
                )
                setCreateMsg("Post Created Successfully awaiting Admin's approval!");
                document.getElementById("feed-post").value="";
                setPostDesc("");
            }
            catch(error)
            {
                console.log(error);
                setCreateMsg("Post Creation Failed!");
            }
        } 
    }
    //To view my post
    async function handleViewMyPost()
    {
        setMyFlag(true);
        setOtherFlag(false);
        try
        {

        }
        catch(error)
        {
            console.log(error);
        }
    }
    //To view other's posts
    async function handleViewOtherPost()
    {
        setOtherFlag(true);
        setMyFlag(false);
    }
    return(
    <>
        <section className="feed-section container-fluid p-5">
            <div className="row row1 mb-5">
                <textarea id="feed-post" onChange={(e)=>setPostDesc(e.target.value)}></textarea>
                <p className="mb-0" style={{color:"red",fontSize:"12px",height:"15px",textAlign:"center"}}>{err1}</p>
                <button className="create-post m-5" onClick={handleCreate}>Create Post</button>
            </div>
            <div className="row">
                <button className="view-my-post mx-5" onClick={handleViewMyPost}>View my Post</button>
                <button className="view-my-post mx-5" onClick={handleViewOtherPost}>View other Post</button>
            </div>
        </section>
        <section className='container-fluid p-5 view-post-section'>
            <div className='row my-post-list' style={{display:(myFlag)?"flex":"none"}}>
                <h3>My Posts</h3>
                <ul className='row'>
                    <li>

                    </li>
                </ul>
            </div>
            <div  className='row other-post-list' style={{display:(otherFlag)?"flex":"none"}}>
                <h3>Other's Post</h3>
                <ul className='row'>
                    <li>
                        
                    </li>
                </ul>
            </div>
        </section>
    </> )
}
export default Feeds;