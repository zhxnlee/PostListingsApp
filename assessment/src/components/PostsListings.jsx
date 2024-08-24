import React, {useState, useEffect} from "react";
import Posts from "./Posts";
import styles from './PostsListings.module.css';
import logo from "../assets/logo.png";


function PostsListings(){

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [showFilter, setShowFilter] = useState(false);
    const [visiblePosts, setVisiblePosts] = useState(5);

    console.log(showFilter);

    useEffect(()=>{
        fetch('/api/posts')
        .then((response) => response.json())
        .then((data)=> {
            setPosts(data.posts);

            const allCategories = data.posts.flatMap(post => post.categories.map(category => category.name));
            const uniqueCategories = [...new Set(allCategories)];

            setCategories(uniqueCategories);
            setSelectedCategories(uniqueCategories);
           

        }).catch((error) => {
            console.error("Error fetching posts", error);
        })
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(cat => cat !== category)
                : [...prevCategories, category]
        );
    };

    const filteredPosts = selectedCategories.length === 0 
    ? posts 
    : posts.filter(post =>
        post.categories.some(category => selectedCategories.includes(category.name))
    );

    const handleLoadMore = () =>{
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts +5);
    }


    
    return(
                
        <div className = {styles.container}>
         
            <div className = {styles.logo}>
            <a href = "https://www.lizard.global/"><img src = {logo} alt = "lizardlogo" /></a>
            </div>

            <div className = {styles.content}>

            <div className = {styles.filter}>
                <button onClick={() => {setShowFilter(!showFilter)}}
                    className={`${styles.filterButton} ${showFilter ? styles.activeButton : ''}`}>Filter</button>
            </div>
            {showFilter &&
                <div className= {styles.filterPosts}>
                   
                    <div className={styles.filterPostsForm}>
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`${styles.categoryButton} ${selectedCategories.includes(category) ? styles.selected : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {(selectedCategories.includes(category)) && (
                                        <span className={styles.tick}>✔  </span>
                                    )}
                                {category}
                            </button>
                        ))}
                    </div>
                </div>}
                

            
                
                <div className = {styles.posts}>
                    {filteredPosts.slice(0,visiblePosts).map(post =>(
                        <Posts key = {post.id} post = {post}/>
                    ))}
                </div>
                
                {visiblePosts < filteredPosts.length && (
                    <div className = {styles.loadMore}>
                        <button onClick = {handleLoadMore}>
                            Load More
                        </button>
                    </div>
                )}
                

            </div>
        </div>
    )
}

export default PostsListings;
