import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
	username: string;
	email: string;
	channel: string;
};
const YouTubeForm = () => {
	const form = useForm<FormValues>();

	// register lets us register on form fields
	const { register, control, handleSubmit } = form;

	const onSubmit = (formdata: FormValues) => {
		console.log("Form submitted", formdata);
	};

	// register itself return 4 properties, rather than this destructure register on the input itself
	// const { name, ref, onBlur, onChange } = register("username");
	return (
		<div className="container mx-auto pt-10">
			<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" {...register("username")} />

				<label htmlFor="email">Email</label>
				<input type="email" id="email" {...register("email")} />

				<label htmlFor="channel">Channel</label>
				<input type="text" id="channel" {...register("channel")} />
				<div>
					<button className="p-2 bg-blue-900 text-white rounded-md hover:bg-blue-500">
						Submit
					</button>
				</div>
			</form>
			<DevTool control={control} />
		</div>
	);
};

export default YouTubeForm;
