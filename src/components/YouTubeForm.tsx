import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
	username: string;
	email: string;
	channel: string;
	social: { twitter: string; facebook: string };
	phoneNumbers: string[];
	phNumbers: {
		number: string;
	}[];
	age: number;
	dob: Date;
};

const YouTubeForm = () => {
	const form = useForm<FormValues>({
		// adding default values to form
		defaultValues: {
			username: "",
			email: "",
			channel: "",
			social: {
				twitter: "",
				facebook: "",
			},
			phoneNumbers: ["", ""],
			phNumbers: [{ number: "" }],
			age: 0,
			dob: new Date(),
		},
	});

	// register lets us register on form fields
	// handlerSubmit takes a submit method, it validate input and passes the values to submit method
	// formState has many properties we are using it here to show error messages
	const { register, control, handleSubmit, formState } = form;
	const { errors } = formState;

	// useFieldArray to add dynamic to fields
	const { fields, append, remove } = useFieldArray({
		name: "phNumbers",
		control,
	});

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
				<div className="form-control flex flex-col">
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
				<div className="form-control flex flex-col">
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
				<div className="form-control flex flex-col">
					<label htmlFor="channel">Channel</label>
					<input
						type="text"
						id="channel"
						{...register("channel", { required: "Channel is required" })}
					/>
					<p className="text-red-500">{errors.channel?.message}</p>
				</div>
				<div className="form-control flex flex-col">
					<label htmlFor="twitter">Twitter</label>
					<input
						type="text"
						id="twitter"
						{...register("social.twitter", {
							required: "Twitter handler is required",
						})}
					/>
					<p className="text-red-500">{errors.social?.twitter?.message}</p>
				</div>
				<div className="form-control flex flex-col">
					<label htmlFor="facebook">Facebook</label>
					<input
						type="text"
						id="facebook"
						{...register("social.facebook", {
							required: "Facebook username is required",
						})}
					/>
					<p className="text-red-500">{errors.social?.facebook?.message}</p>
				</div>
				<div className="form-control flex flex-col">
					<label htmlFor="primary-phone">Primary phone number</label>
					<input
						type="text"
						id="primary-phone"
						{...register("phoneNumbers.0", {
							required: "Primary phone is required",
						})}
					/>
					<p className="text-red-500">
						{errors.phoneNumbers ? errors.phoneNumbers[0]?.message : ""}
					</p>
				</div>
				<div className="form-control flex flex-col">
					<label htmlFor="secondary-phone">Secondary phone number</label>
					<input
						type="text"
						id="secondary-phone"
						{...register("phoneNumbers.1", {
							required: "Secondary phone is required",
						})}
					/>
					<p className="text-red-500">
						{errors.phoneNumbers ? errors.phoneNumbers[1]?.message : ""}
					</p>
				</div>

				<label htmlFor="">List of phone numbers</label>
				<div>
					{fields.map((field, index) => {
						return (
							<div
								className="form-control flex flex-col gap-y-4"
								key={field.id}
							>
								<input
									type="text"
									className="mb-2"
									{...register(`phNumbers.${index}.number` as const)}
								/>
								{index > 0 && (
									<button type="button" onClick={() => remove(index)}>
										Remove phone number
									</button>
								)}
							</div>
						);
					})}

					{/* adding append function to add another phonen number field */}
					<button type="button" onClick={() => append({ number: "" })}>
						Add phone number
					</button>
				</div>
				<div className="form-control flex flex-col">
					<label htmlFor="age">Age</label>
					<input
						type="text"
						id="age"
						{...register("age", {
							valueAsNumber: true, //to get value as a number
							required: "Age is required",
						})}
					/>
					<p className="text-red-500">{errors.age?.message}</p>
				</div>
				<div className="form-control flex flex-col">
					<label htmlFor="dob">Date of birth</label>
					<input
						type="date"
						id="dob"
						{...register("dob", {
							valueAsDate: true,
							required: "Date of birth is required",
						})}
					/>
					<p className="text-red-500">{errors.dob?.message}</p>
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
