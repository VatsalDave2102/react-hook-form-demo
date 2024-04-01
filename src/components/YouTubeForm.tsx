import { useForm } from "react-hook-form";

const YouTubeForm = () => {
	const form = useForm();
	return (
		<div className="container mx-auto pt-10">
			<form className="flex flex-col gap-2">
				<label htmlFor="username">Username</label>
				<input type="text" id="username" name="username" />

				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" />

				<label htmlFor="channel">Channel</label>
				<input type="text" id="channel" name="channel" />
				<div>
					<button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-500">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default YouTubeForm;
