import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Modal = ({ isOpen, onClose, onOpen, isUpdating, contact }) => {

	const contactRef = collection(db, "contact");

	const addContact = async (values) => {
		try {
			await addDoc(contactRef, values);
		} catch (err) {
			console.log(err);
		}
	};

	const updateContact = async (values, id) => {
		const contactRef = doc(db, "contact", id);
		try {
			await updateDoc(contactRef, values)
		} catch (err) {
			console.log(err);
		}
	};

	const validationWithYup = () => {
		return Yup.object({

		name: Yup.string()
		 .required('Required'),

		email: Yup.string().email('Invalid email address').required('Required'),
		})
	}

	return createPortal(
		<>
			{isOpen && (
				<div className="backdrop-blur w-screen h-screen absolute top-0 bg-white/60 z-20">
					<div className="bg-white min-w-[300px] p-2 mx-auto z-50 absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 rounded">
						<div className="flex justify-end">
							<MdClose
								className="cursor-pointer text-2xl "
								onClick={onClose}
							/>
						</div>
						{/* formik for forms */}
						<Formik
							initialValues={
								!isUpdating ? {
									name: "",
									email: "",
								} : 
								{
									name: contact.name,
									email: contact.email
								}
							}
							validationSchema= {validationWithYup()}
							onSubmit={(values) => {
								!isUpdating ? addContact(values) : updateContact(values, contact.id)
								!isUpdating ? toast.success("contact saved") : toast.success("contact updated");
								onClose();
							}}
						>
							<Form className="flex flex-col gap-2">
								<div className="flex flex-col">
									<label htmlFor="name">Name</label>
									<Field
										className="border-[1px]"
										name="name"
									/>
									<div className="text-red-600">
										<ErrorMessage name="name" />
									</div>
								</div>

								<div className="flex flex-col">
									<label htmlFor="email">Email</label>
									<Field
										type="email"
										name="email"
										className="border-[1px]"
									/>
									<div className="text-red-600">
										<ErrorMessage name="email" />
									</div>
								</div>

								<button
									className="self-end bg-orange px-3 py-2 rounded m-2"
									type="submit"
								>
									{isUpdating
										? "Update Contact"
										: "Add to Contact"}
								</button>
							</Form>
						</Formik>
					</div>
					<div className="w-screen h-screen absolute top-0 z-10 " onClick={onClose}></div>
					
				</div>

			)}
		</>,
		document.getElementById("modal-root"),
	);
};
export default Modal;
