import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Pagination from '@mui/material/Pagination';
const PostList=()=>{
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
                      if((arr1[j].postStatus === "approved") )
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
      //Pagination
     const [page, setPage] = useState(1);
     const handleChange = (event, value) => {
       setPage(value);
     };
     const pageCount=Math.ceil(allPosts.length/5);
     const itemsPerPage=5;
 

    
    return(
        <section className='container-fluid p-5 view-post-section'>
          <div  className='row other-post-list'>
                <h3><i className="me-2 fa-solid fa-mug-saucer"></i>Feed Buzz</h3>
                <ul className='row'>
                {allPosts && allPosts.slice((page-1)*itemsPerPage,page*itemsPerPage).map((post)=> 
                    <li key={post.postId} className='p-2'>
                        <p>Post:"{post.postDesc}"</p>
                        <p>Date:"{post.postDate}"</p>
                        <p>Creator:"{post.postCreator}"</p>
                    </li>)}
                </ul>
            </div>
            <div className=" container-fluid feed-pagination">
                <Pagination count={pageCount} page={page} onChange={handleChange} />
            </div>

        </section>
    )
}
export default PostList;