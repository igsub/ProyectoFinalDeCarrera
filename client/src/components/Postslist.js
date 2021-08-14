import postService from '../services/productService'
import {useState} from 'react'
function Postslist (){

    const [obtainedPosts, setPosts] = useState([]);
    
    postService.getAll().then(item => setPosts(item.data));
       
    return  <div>
                <h1>hello from components</h1>
                <ul>
                    {obtainedPosts.map(p => <li key={p._id}>{p.title}</li>)}
                </ul>
            </div>
}

export default Postslist;