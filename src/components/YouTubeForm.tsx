import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
	username: string;
	email: string;
	channel: string;
	social: { twitter: string; facebook: string };
};

const YouTubeForm = () => {
	const form = useForm<FormValues>({
		// adding default values to form
		defaultValues: {
			username: "",
			email: "",
			channel: "",
		},
	});

	// register lets us register on form fields
	// handlerSubmit takes a submit method, it validate input and passes the values to submit method
	// formState has many properties we are using it here to show error messages
	const { register, control, handleSubmit, formState } = form;
	const { errors } = formState;

	const onSubmit = (formdata: FormValues) => {
		console.log("Form submitted", formdata);
	};

	// register itself return 4 properties, rather than this destructure register on the input itself
	// const { name, ref, onBlur, onChange } = register("username");
	return (
		<div className="container mx-auto pt-10">
			<form
				className="flex flex-col gap-2"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						{...register("username", {
							required: {
								value: true,
								message: "Username is required",
							},
							validate: (value) => {
								return (
									value !== "admin@example.com" ||
									"Enter a different email address"
								);
							},
						})}
					/>
					<p className="text-red-500">{errors.username?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						{...register("email", {
							pattern: {
								value:
									/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
								message: "Invalid email format",
							},
						})}
					/>
					<p className="text-red-500">{errors.email?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="channel">Channel</label>
					<input
						type="text"
						id="channel"
						{...register("channel", { required: "Username is required" })}
					/>
					<p className="text-red-500">{errors.channel?.message}</p>
				</div>
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
