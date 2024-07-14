import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Feeds=()=>{
    //For error handling
    const [err1,setErr1]=useState("");
    const [createMsg,setCreateMsg]=useState("");
    const [err2,setErr2]=useState("");
    const [updateMsg,setUpdateMsg]=useState("")
    const [myFlag,setMyFlag]=useState(false);
    const [otherFlag,setOtherFlag]=useState(false);

    //Post Model
    const user_Id=localStorage.getItem("userId");
    const [userId,setUserId]=useState(user_Id);
    let postId;
    const date2=new Date();
    const date1=date2.getDate()+"-"+(date2.getMonth()+1)+"-"+date2.getFullYear()+", "+
    date2.getHours()+":"+date2.getMinutes();
    //const date1=new Date().toISOString().split('T')[0];
    const [postDate,setPostDate]=useState(date1);
    const postAuthor=localStorage.getItem("authenticatedUser");
    const [postCreator,setPostCreator]=useState(postAuthor);
    const [postDesc,setPostDesc]=useState("");
    const [postStatus,setPostStatus]=useState("pending");
    //Update
    const [updatePostId,setUpdatePostId]=useState("");
    const [updatePostDesc,setUpdatePostDesc]=useState("");
    const [updatePostStatus,setUpdatePostStatus]=useState("pending");
   
    //Handling post creation
    async function handleCreate()
    {
        setErr1("");
        setCreateMsg("");
        var flag1;
        const res=await axios.get("http://localhost:8080/feed/user/myPosts/"+user_Id);
        postId=res.data.postCount;
        (postDesc.trim()==="" || postDesc.length<15)?setErr1("Your post must contain atleast 15 characters"): flag1=true;
        if(flag1 === true)
        {
            try
            {
                const res=await axios.post("http://localhost:8080/feed/user/createPost/"+user_Id,
                    {
                        userId,
                        postId,
                        postDate,
                        postDesc,
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
  
    async function handleUpdate()
    {
        setErr2("");
        setUpdateMsg("");
        var flag1;
        (updatePostDesc.trim()==="" || updatePostDesc.length<15)?setErr2("Your post must contain atleast 15 characters"): flag1=true;
        if(flag1 === true)
        {
            try
            {
                const res=await axios.put("http://localhost:8080/feed/user/updatePost/"+user_Id,
                    {
            
                        "postId":updatePostId,
                        "postDesc":updatePostDesc,
                        "postStatus":updatePostStatus
                    }
                )
                setUpdateMsg("Post Updated Successfully and it is awaiting Admin's approval!");
                console.log(res);
            }
            catch(error)
            {
                console.log(error);
                setUpdateMsg("Post updation Failed!");
            }
        } 
    }

    async function handleDel(a)
    {
     
            try
            {
                const res=await axios.delete(`http://localhost:8080/feed/user/deletePost/${user_Id}`,{data:{"postId":a}})
                console.log(res);
            }
            catch(error)
            {
                console.log(error);
            }
    } 
    
       // const onDateFocus = (e) => (e.target.type = "date");
       // const onDateBlur = (e) => (e.target.type = "text");
    return(
    <>
        {/*<input
        onFocus={onDateFocus}
        onBlur={onDateBlur}
        type="text"
        placeholder="Event Date"
        />*/}
        <section className="feed-section container-fluid p-5">
            <div className="row row1 mb-5">
                <textarea id="feed-post" onChange={(e)=>setPostDesc(e.target.value)}></textarea>
                <p className="mb-0" style={{color:"red",fontSize:"12px",height:"15px",textAlign:"center"}}>{err1}</p>
                <button className="create-post m-5" onClick={handleCreate}>Create Post</button>
                <p className="mb-0" style={{color:(createMsg.includes("uccess"))?"green":"red",fontSize:"12px",height:"15px",textAlign:"center"}}>{createMsg}</p>
            </div>
            <div className='view-link'>
                <Link className="view-my-post mx-5" to="/feed/myActivity">view my posts</Link>
                <Link className="view-my-post mx-5" to="/feed/publicFeed">View Feed</Link>
            </div>
        </section>
    {/*Update the post modal*/}
    {/*-- Modal --*/}
        <div class="modal fade updateModal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Post</h1>
                <button data-bs-dismiss="modal" style={{background:"none", border:"none"}} ><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <textarea id="feed-post1" style={{width:"100%"}} defaultValue={updatePostDesc} onChange={(e)=>setUpdatePostDesc(e.target.value)}></textarea>
                <p className="mb-0" style={{color:"red",fontSize:"12px",height:"15px",textAlign:"center"}}>{err2}</p>
            </div>
            <div class="modal-footer">
                <button onClick={handleUpdate}>Update</button>
                <p className="mb-0" style={{color:(updateMsg.includes("uccess"))?"green":"red",fontSize:"12px",height:"15px",textAlign:"center"}}>{updateMsg}</p>
            </div>
            </div>
        </div>
        </div>
    </> )
}
export default Feeds;