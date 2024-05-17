import { Appbar } from "./AppBar"

export const FullBlogSkeleton = () =>{
    return (
    <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="animate-pulse bg-gray-200 h-10 w-full mb-4"></div>
                    <div className="animate-pulse bg-gray-200 h-6 w-1/2 mb-4"></div>
                    <div className="animate-pulse bg-gray-200 h-6 w-3/4 mb-4"></div>
                    <div className="animate-pulse bg-gray-200 h-6 w-full mb-4"></div>
                </div>
                <div className="col-span-4">
                    <div className="animate-pulse bg-gray-200 h-10 w-full mb-4"></div>
                    <div className="animate-pulse bg-gray-200 h-6 w-full mb-4"></div>
                    <div className="animate-pulse bg-gray-200 h-6 w-full mb-4"></div>
                    <div className="animate-pulse bg-gray-200 h-6 w-full mb-4"></div>
                </div>
            </div>
        </div>
    </div>
    );
}