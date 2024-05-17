import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


interface blog{
    content : string,
    title : string,
    id : string,
    author : {
        name : string
    }
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>{
            setBlogs(response.data);
            setLoading(false);
        })
    }, []);

    return {loading, blogs};
}

export const useBlog = ({id} : {id : string})=>{
    const [loading, setLoading] = useState(true);
    const [blogContent, setBlogContent] = useState<blog>({
        content: "",
        title: "",
        id: "",
        author: {
            name: ""
        }});

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>{
            setBlogContent(response.data);
            setLoading(false);
        })
    }, [id]);

    return {loading, blogContent};
}