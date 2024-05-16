import {useState,useEffect} from 'react';
import axios from 'axios';
const Feeds=()=>{
    //For error handling
    const [err1,setErr1]=useState("");
    const [createMsg,setCreateMsg]=useState("");
    const [err2,setErr2]=useState("");
    const [updateMsg,setUpdateMsg]=useState("")
    const [myFlag,setMyFlag]=useState(false);
    const [otherFlag,setOtherFlag]=useState(false);
    //For viewing posts
    const [myPosts,setMyPosts]=useState([]);
    const [allPosts,setAllPosts]=useState([]);
    //Post Model
    const user_Id=localStorage.getItem("userId");
    const [userId,setUserId]=useState(user_Id);
    let postId;
    const date1=new Date().toISOString().split('T')[0];
    const [postDate,setPostDate]=useState(date1);
    const postAuthor=localStorage.getItem("authenticatedUser");
    const [postCreator,setPostCreator]=useState(postAuthor);
    const [postDesc,setPostDesc]=useState("");
    const [postStatus,setPostStatus]=useState("pending");
    //Update
    const [updatePostId,setUpdatePostId]=useState("");
    const [updatePostDesc,setUpdatePostDesc]=useState("");
    const [updatePostStatus,setUpdatePostStatus]=useState("pending");
   
    //Getting all my posts
    async function getAllMyPosts()
    {
        try
        {
            console.log(userId);
            const res=await axios.get("http://localhost:8080/feed/user/myPosts/"+user_Id);
            var myValidPost=res.data.feedList.filter((post)=> post.postStatus !== "deleted");
            setMyPosts(myValidPost);
            console.log(res.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    //Getting all others posts
    async function getAllOtherPosts()
    {
        try
        {
            console.log(userId);
            const res=await axios.get("http://localhost:8080/feed/allApprovedPosts");
            var unfilteredOtherPosts=[];
            for(var i=0;i<(res.data.length);i++)
            {
                var arr1=res.data[i].feedList;
                for(var j=0;j<arr1.length;j++)
                {
                    if((arr1[j].postStatus !== "deleted") &&(arr1[j].userId === user_Id))
                    {
                        unfilteredOtherPosts.push(arr1[j]);
                    }
                }

            }
            setAllPosts(unfilteredOtherPosts);
            console.log("UnfilteredOtherPosts",unfilteredOtherPosts);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{getAllMyPosts();getAllOtherPosts();},[]);
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
    //To view my post
    async function handleViewMyPost()
    {
        setMyFlag(true);
        setOtherFlag(false);
    }
    //To view other's posts
    async function handleViewOtherPost()
    {
        setOtherFlag(true);
        setMyFlag(false);
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
                document.getElementById("feed-post1").value="";
                setPostDesc("");
            }
            catch(error)
            {
                console.log(error);
                setUpdateMsg("Post Creation Failed!");
                document.getElementById("feed-post1").value="";
                setPostDesc("");
            }
        } 
    }

    async function handleDel(a,b)
    {
      
            try
            {
                const res=await axios.put("http://localhost:8080/feed/user/updatePost/"+user_Id,
                    {
            
                        "postId":a,
                        "postDesc":b,
                        "postStatus":"deleted"
                    }
                )
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
            <div>
                <button className="view-my-post mx-5" onClick={handleViewMyPost}>My Posts</button>
                <button className="view-my-post mx-5" onClick={handleViewOtherPost}>Other's Posts</button>
            </div>
        </section>
        <section className='container-fluid p-5 view-post-section'>
            <div className='row my-post-list' style={{display:(myFlag)?"flex":"none"}}>
                <h3>My Posts</h3>
                <ul className='row'>
                  {myPosts && myPosts.map((post)=> 
                    <li key={post.postId} className='p-2'>
                        <p>Post:"{post.postDesc}"</p>
                        <p>Date:"{post.postDate}"</p>
                        <p>Creator:"{post.postCreator}"</p>
                        <div className='row row-cols-2 feed-edit'>
                            <button className="col mx-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
                            onClick={()=>{ setUpdatePostId(post.postId);
                                            setUpdatePostDesc(post.postDesc);
                                            setUpdatePostStatus(post.postStatus);
                                           }}>update</button>
                            <button className='col mx-5' onClick={()=>{handleDel(post.postId,post.postDesc)}}>delete</button>
                        </div>
                    </li>)}
                </ul>
            </div>
            <div  className='row other-post-list' style={{display:(otherFlag)?"flex":"none"}}>
                <h3>Other's Post</h3>
                <ul className='row'>
                {allPosts && allPosts.map((post)=> 
                    <li key={post.postId} className='p-2'>
                        <p>Post:"{post.postDesc}"</p>
                        <p>Date:"{post.postDate}"</p>
                        <p>Creator:"{post.postCreator}"</p>
                    </li>)}
                </ul>
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