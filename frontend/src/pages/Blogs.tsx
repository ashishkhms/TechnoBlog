import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () =>{
    const {loading, blogs} = useBlogs();

    if(loading){
        return (
        <div>
            <Appbar/>
            <div className="flex justify-center">
                <div className="max-w-xl">
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                </div>
            </div>
        </div>
        );
    }


    return <div>
         <Appbar/>
        <div className="flex justify-center">
            <div className="max-w-xl">
                {
                    blogs.map((b)=>{
                        return (
                            <BlogCard 
                            authorName={b.author.name}
                            title={b.title}
                            content={b.content}
                            publishedDate={"2nd Feb 2024"}
                            id = {b.id} 
                            key = {b.id} />
                        );
                    })
                }
            </div>
        </div>
    </div>
}