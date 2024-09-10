import React, {useState} from "react";
import styles from "./Posts.module.css";
import { Link } from "react-router-dom";

function Posts({ post, showSummary = false }){

    const [moreDetails, setMoreDetails] = useState(false);
    const [publishedOn, setPublishedOn] = useState(false);
    
    return(
        <div className = {styles.container}>
            <div className = {styles.name}>
                <img src = {post.author.avatar} alt = {post.author.name}/>
                <h3>{post.author.name}</h3>
                
            </div>
            <div className = {styles.publishedDate}> 
                <p onMouseEnter={() => setPublishedOn(true)} onMouseLeave={() => setPublishedOn(false)}>
                    {publishedOn && <span>Published on: </span>}
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                </p>
            </div>
            

            <div className = {styles.titleContainer}  onMouseEnter={()=> setMoreDetails(true)} onMouseLeave={()=> setMoreDetails(false)}>
                <Link to={`/PostListingsApp/posts/${post.id}`}>
                    <h1 className={styles.title}>{post.title} </h1>
                </Link>
                <div className = {styles.moreDetails}>

                    {(moreDetails && !showSummary) &&<Link to={`/PostListingsApp/posts/${post.id}`}><h3>{`More details →`}</h3></Link>}
                </div>
                
      </div>
            {showSummary && (
                <div>
            <div className={styles.summary}>
                <p>{post.summary}</p>
            </div>
            <div className = {styles.categories}>
                <ul>
                    {post.categories.map(category =>(
                        <li key = {category.id}>{category.name}</li>
                    ))}
                </ul>
            </div>
                </div>

            

      )}

        
        </div>
    )
}

export default Posts;