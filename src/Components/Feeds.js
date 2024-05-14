const Feeds=()=>{
    return(
        <section className="feed-section container-fluid">
            <div className="row">
                <textarea id="feed-post"></textarea>
                <button className="create-post">Create Post</button>
            </div>
            <div className="row">
                <button className="view-my-post">View my Post</button>
                <button className="view-my-post">View other Post</button>
            </div>
        </section>
    )

}
export default Feeds;