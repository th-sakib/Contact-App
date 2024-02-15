import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { db } from "../config/firebase";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import useDisclosure from "../hooks/useDisclosure";
import Modal from "./Modal"
import { toast } from 'react-toastify';

const Contact = ({ contact }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const deleteContact = async (id) => {
		try {
			await deleteDoc(doc(db, "contact", id));
			toast.warn("Contact Deleted!")
		} catch (err) {
			console.log(err);
		}
	};

	const { name, email, id } = contact;
	return (
		<>
			<div className="flex items-center justify-between bg-dark-yellow rounded-xl py-2 px-4 mt-4 mb-2">
				<HiOutlineUserCircle className="text-5xl text-orange" />
				<div className=" leading-6 mx-2 min-w-[63%] overflow-hidden">
					<h2 className=" text-[1.2rem] font-semibold ">{name}</h2>
					<p className="">{email}</p>
				</div>
				{/*==============================buttons=========================*/}
				<div className="flex ">
					<RiEditCircleLine
						className="text-3xl text-black cursor-pointer"
						onClick={onOpen}
					/>
					<AiOutlineDelete
						className="text-3xl text-orange cursor-pointer"
						onClick={() => deleteContact(id)}
					/>
				</div>
			</div>
			<Modal isUpdating isOpen={isOpen} onOpen={onOpen} onClose={onClose} contact={contact}></Modal>
		</>
	);
};

export default Contact;
