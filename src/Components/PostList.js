import { useState } from "react";
const PostList=()=>{
    const [allPosts,setAllPosts]=useState([]);
    
    return(
        <section className='container-fluid p-5 view-post-section'>
          <div  className='row other-post-list'>
                <h3><i className="me-2 fa-solid fa-mug-saucer"></i>Feed Buzz</h3>
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
    )
}
export default PostList;