import axios from "axios";
import { Appbar } from "../components/AppBar";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Publish = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false); // Track loading state
	const navigate = useNavigate();

	const handlePublish = async () => {
		try {
			setLoading(true); // Set loading to true when button is clicked
			const response = await axios.post(
				`${BACKEND_URL}/api/v1/blog`,
				{
					title,
					content: description,
				},
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
			navigate(`/blog/${response.data.id}`);
		} catch (error) {
			console.error("Error publishing post:", error);
		} finally {
			setLoading(false); // Reset loading state after request completes
		}
	};

	return (
		<div>
			<Appbar />
			<div className="flex justify-center w-full pt-8">
				<div className="max-w-screen-lg w-full">
					<input
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						placeholder="Title"
					/>

					<TextEditor
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
					<button
						onClick={handlePublish} // Call handlePublish instead of anonymous function
						type="submit"
						disabled={loading} // Disable button when loading
						className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
					>
						{loading ? ( // Render loader if loading, else render button text
							<svg
								className="animate-spin h-5 w-5 mr-3 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 4.418 3.582 8 8 8v-4zm14-2a8.006 8.006 0 01-2 5.291V20c4.418 0 8-3.582 8-8h-4zm-2-9.291C19.373 7.074 15.926 4 12 4v4c1.657 0 3.186.641 4.343 1.757l-2.686 2.687A3.978 3.978 0 0012 12V8c1.33 0 2.55.517 3.464 1.433l-1.787 1.787a1 1 0 11-1.414-1.414l1.793-1.793C14.55 7.517 13.33 7 12 7V3c3.925 0 7.373 3.074 7.993 6.709z"
								></path>
							</svg>
						) : (
							"Publish post"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

function TextEditor({
	onChange,
}: {
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
	return (
		<div className="mt-2">
			<div className="w-full mb-4 ">
				<div className="flex items-center justify-between border">
					<div className="my-2 bg-white rounded-b-lg w-full">
						<label className="sr-only">Publish post</label>
						<textarea
							onChange={onChange}
							id="editor"
							rows={8}
							className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
							placeholder="Write an article..."
							required
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
