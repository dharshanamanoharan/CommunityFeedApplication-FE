import {useState,useEffect} from 'react';
import axios from 'axios';
const AdminPanel=()=>{
    //Update
      const [updatePostId,setUpdatePostId]=useState("");
      const [updatePostDesc,setUpdatePostDesc]=useState("");
      const [updatePostStatus,setUpdatePostStatus]=useState("pending");

    //For viewing posts
    const [allPosts,setAllPosts]=useState([]);
     
      //Getting all others posts
      async function getAllOtherPosts()
      {
          try
          {
              const res=await axios.get("http://localhost:8080/feed/allApprovedPosts");
              var filteredOtherPosts=[];
              for(var i=0;i<(res.data.length);i++)
              {
                  var arr1=res.data[i].feedList;
                  for(var j=0;j<arr1.length;j++)
                  {
                      if((arr1[j].postStatus !== "deleted") &&(arr1[j].postStatus !== "approved"))
                      {
                          filteredOtherPosts.push(arr1[j]);
                      }
                  }
  
              }
              setAllPosts(filteredOtherPosts);
              console.log("filteredOtherPosts",filteredOtherPosts);
          }
          catch(error)
          {
              console.log(error);
          }
      }
      useEffect(()=>{getAllOtherPosts();},[]);

      //Handling delete
      async function handleDel(a,b)
      {
        
              try
              {
                  const res=await axios.put("http://localhost:8080/feed/user/updatePost/"+"user_Id",
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
    return(
        <>
        <section className='container-fluid p-5 view-post-section'>
            <div className='row my-post-list' >
                <h3>Posts pending for Approval</h3>
                <ul className='row'>
                  {allPosts && allPosts.map((post)=> 
                    <li key={post.postId} className='p-2'>
                        <p>Post:"{post.postDesc}"</p>
                        <p>Date:"{post.postDate}"</p>
                        <p>Creator:"{post.postCreator}"</p>
                        <div className='row row-cols-2 feed-edit'>
                            <button className="col mx-5"
                            onClick={()=>{ setUpdatePostId(post.postId);
                                            setUpdatePostDesc(post.postDesc);
                                            setUpdatePostStatus(post.postStatus);
                                           }}>Approve</button>
                            <button className='col mx-5' onClick={()=>{handleDel(post.postId,post.postDesc)}}>delete</button>
                        </div>
                    </li>)}
                </ul>
            </div>
        </section>
        </>
    )

}
export default AdminPanel;