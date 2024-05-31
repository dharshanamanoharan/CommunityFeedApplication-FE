import {useState,useEffect} from 'react';
import axios from 'axios';
const MyActivity=()=>{
      //For error handling
      const [err1,setErr1]=useState("");
      const [createMsg,setCreateMsg]=useState("");
      const [err2,setErr2]=useState("");
      const [updateMsg,setUpdateMsg]=useState("")
      const [myFlag,setMyFlag]=useState(false);
      const [otherFlag,setOtherFlag]=useState(false);

      //For viewing posts
      const [myPosts,setMyPosts]=useState([]);
    
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
            const res=await axios.get("http://localhost:8080/feed/user/myPosts/"+user_Id);
            var myValidPost=res.data.feedList.filter((post)=> post.postStatus !== "deleted");
            setMyPosts(myValidPost);
            console.log("My Posts",myValidPost);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{getAllMyPosts();},[]);
    //Handle Update
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

    //Handle Delete
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
    return(
        <section className='container-fluid p-5 view-post-section'>
        <div className='row my-post-list' style={{display:"flex"}}>
            <h3>My Posts</h3>
            <ul className='row'>
              {myPosts && myPosts.map((post)=> 
                <li key={post.postId} className='p-2'>
                    <p>Post:"{post.postDesc}"</p>
                    <p>Date:"{post.postDate}"</p>
                    <p>Creator:"{post.postCreator}"</p>
                    <div className='row row-cols-2 feed-edit'>
                        {(post.postStatus==="pending")?<>
                        <button className="col mx-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
                        onClick={()=>{ setUpdatePostId(post.postId);
                                        setUpdatePostDesc(post.postDesc);
                                        setUpdatePostStatus(post.postStatus);
                                       }}>update</button>
                        <button className='col mx-5' onClick={()=>{handleDel(post.postId);}}>delete</button>
                   </>:<></> }
                    </div>
                </li>)}
            </ul>
        </div>
    </section>
    )
}
export default MyActivity;