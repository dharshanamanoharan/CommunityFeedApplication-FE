import {useState,useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
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
            //console.log("My Posts",myValidPost);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{getAllMyPosts();},[handleUpdate,handleDel]);
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
                //console.log(res);
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
            //console.log(res);
        }
        catch(error)
        {
            console.log(error);
        }
    } 
     //Pagination
     const [page, setPage] = useState(1);
     const handleChange = (event, value) => {
       setPage(value);
     };
     const pageCount=Math.ceil(myPosts.length/5);
     const itemsPerPage=5;
 
    return(
        <section className='container-fluid p-5 view-post-section'>
        <div className='row my-post-list' style={{display:"flex"}}>
            <h3><i className="me-2 fa-solid fa-mug-saucer"></i>My Buzz</h3>
            <ul className='row'>
              {myPosts && myPosts.slice((page-1)*itemsPerPage,page*itemsPerPage).map((post)=> 
                <li key={post.postId} className='p-2 feed-li'>
                    <p><i className="fa-solid fa-message"></i> Buzz : "{post.postDesc}"</p>
                    <p><i className="fa fa-calendar"></i> Created on : {post.postDate}</p>
                    <p><i className="fa fa-user"></i> Author : {post.postCreator}</p>
                    <div className='feed-edit'>
                        {(post.postStatus==="pending")?<>
                        <button className=" my-update" data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
                        onClick={()=>{ setUpdatePostId(post.postId);
                                        setUpdatePostDesc(post.postDesc);
                                        setUpdatePostStatus(post.postStatus);
                                       }}><i className="fa-solid fa-pen-to-square my-delete"></i></button>
                        <button className=' my-delete' onClick={()=>{handleDel(post.postId);}}><i className="fa-solid fa-trash"></i></button>
                   </>:<></> }
                    </div>
                </li>)}
            </ul>
        </div>
        {/*Update the post modal*/}
        {/*-- Modal --*/}
        <div className="modal fade updateModal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Post</h1>
                    <button data-bs-dismiss="modal" style={{background:"none", border:"none"}} ><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="modal-body">
                    <textarea id="feed-post1" style={{width:"100%"}} defaultValue={updatePostDesc} onChange={(e)=>setUpdatePostDesc(e.target.value)}></textarea>
                    <p className="mb-0" style={{color:"red",fontSize:"12px",height:"15px",textAlign:"center"}}>{err2}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={handleUpdate}>Update</button>
                    <p className="mb-0" style={{color:(updateMsg.includes("uccess"))?"green":"red",fontSize:"12px",height:"15px",textAlign:"center"}}>{updateMsg}</p>
                </div>
                </div>
            </div>
        </div>
        <div className=" container-fluid feed-pagination">
            <Pagination count={pageCount} page={page} onChange={handleChange} />
      </div>
    </section>
    
    )
}
export default MyActivity;