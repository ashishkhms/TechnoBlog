import { Appbar } from "../components/AppBar";
import { Avatar } from "../components/BlogCard";
import { useBlog } from "../hooks";
import { useParams } from 'react-router-dom';
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";

  export const FullBlog = ()=>{
    const {id}  = useParams();
    const {loading, blogContent} = useBlog({id : id||""});

    if(loading){
        return <div>
            <FullBlogSkeleton/>
        </div>
    }


    return (
		<div>
			<Appbar />
			<div className="flex justify-center">
				<div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
					<div className="col-span-8">
						<div className="text-5xl font-extrabold">
							{blogContent.title}
						</div>
						<div className="text-slate-500 pt-2">
							Post on 2nd December 2023
						</div>
						<div className="pt-4">{blogContent.content}</div>
					</div>
					<div className="col-span-4">
						<div className="text-slate-600 text-lg">Author</div>
						<div className="flex w-full">
							<div className="pr-4 flex flex-col justify-center">
								<Avatar size="big" name={blogContent.author.name || "Anonymous"} />
							</div>
							<div>
								<div className="text-xl font-bold">
									{blogContent.author.name || "Anonymous"}
								</div>
								<div className="pt-2 text-slate-500">
									Random catch phrase about the author's
									ability to grab the user's attention
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
