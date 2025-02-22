import {useState,useEffect} from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
const AdminPanel=()=>{
    //Update
      const [updatePostId,setUpdatePostId]=useState("");
      const [updatePostDesc,setUpdatePostDesc]=useState("");
      const [updatePostStatus,setUpdatePostStatus]=useState("pending");

    //For viewing posts
    const [allPosts,setAllPosts]=useState([]);
     
      //Getting all others posts.
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

      //Handling  approve and delete
      async function updatePost(a,b,c,d)
      {
        
              try
              {
                  const res=await axios.put("http://localhost:8080/feed/user/updatePost/"+c,
                      {
              
                          "postId":a,
                          "postDesc":b,
                          "postStatus":d
                      }
                  )
              }
              catch(error)
              {
                  console.log(error);
              }
     } 
     //Delete
     async function handleDel(a,b)
    {
     
            try
            {
                const res=await axios.delete(`http://localhost:8080/feed/user/deletePost/${a}`,{data:{"postId":b}})
                console.log(res);
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
     const pageCount=Math.ceil(allPosts.length/5);
     const itemsPerPage=5;
 
    return(
        <>
        <section className='container-fluid p-5 view-post-section'>
            <div className='row my-post-list' >
                <h3>Posts Pending for Approval</h3>
                <ul className='row'>
                  {allPosts && allPosts.slice((page-1)*itemsPerPage,page*itemsPerPage).map((post)=> 
                    <li key={post.postId} className='p-2'>
                         <p> <i className="fa-solid fa-message"></i> Buzz: "{post.postDesc}"</p>
                         <p> <i className="fa fa-calendar"></i> Created on : {post.postDate}</p>
                         <p> <i className="fa fa-user"></i> Author : {post.postCreator}</p>
                        <div className='row row-cols-2 feed-edit'>
                            <button className="col"
                            onClick={()=>{updatePost(post.postId,post.postDesc,post.userId,"approved")}}><i className="fa fa-check"></i></button>
                            <button className='col' onClick={()=>{handleDel(post.userId,post.postId)}}><i className="fa fa-xmark"></i></button>
                        </div>
                    </li>)}
                </ul>
            </div>
            <div className=" container-fluid feed-pagination">
                <Pagination count={pageCount} page={page} onChange={handleChange} />
            </div>
        </section>
        </>
    )

}
export default AdminPanel;