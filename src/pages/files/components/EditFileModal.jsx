// import { Button, Checkbox, FileInput, Label, Modal, TextInput } from "flowbite-react";
// import { useRef, useState } from "react";
// import { editFile, storeFile } from "../../../services/fileService";
// import "toastify-js/src/toastify.css";
// import Toastify from "toastify-js";

// export function EditFileModal({ handlEditFile, groupId, file }) {
//     const [openModal, setOpenModal] = useState(false);
//     const [newName, setNewName] = useState(file.name);
//     const [isLoad, setIsLoad] = useState(false);

//     function onCloseModal() {
//         setOpenModal(false);
//     }

//     const handleNameChange = (e) => {
//         setNewName(e.target.value);
//     };

//     const handleStoreFile = async (e) => {
//         setIsLoad(true)
//         e.preventDefault();
//         if (!newName) {
//             Toastify({
//                 text: "يرجى إدخال اسم جديد للملف.",
//                 duration: 5000,
//                 close: true,
//                 gravity: "top",
//                 position: "center",
//                 stopOnFocus: true,
//             }).showToast();
//             setIsLoad(false)
//             return
//         }
//         try {
//             const result = await editFile(groupId, file.id, newName);
            
//             // handlEditFile(result.data);
//             setNewName(null);
//             setIsLoad(false)
//             setOpenModal(false)
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             Toastify({
//                 text: "Error uploading file: " + error.response.data.message,
//                 duration: 5000,
//                 close: true,
//                 gravity: "top",
//                 position: "center",
//                 style: {
//                     backgroundColor: "gray",
//                 },
//                 stopOnFocus: true,
//             }).showToast();
//             setIsLoad(false)
//         }

//     };

//     return (
//         <>
//             <Button size="sm" onClick={() => setOpenModal(true)}>Edit</Button>
//             <Modal
//                 popup
//                 dismissible
//                 size="sm"
//                 show={openModal}
//                 onClose={onCloseModal}
//             >
//                 <Modal.Header >
//                 <h3 className="text-xl font-medium text-gray-900 dark:text-white p-2">Edit File</h3>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         <div className="mb-2 block">
//                             <Label htmlFor="name" value="New File Name" />
//                         </div>
//                         <TextInput
//                             id="name"
//                             sizing="md"
//                             placeholder="new name"
//                             value={newName}
//                             onChange={handleNameChange}
//                         />
//                     </div>
//                     <Button
//                         className="mt-5"
//                         isProcessing={isLoad}
//                         disabled={!newName}
//                         onClick={handleStoreFile}
//                     >
//                         Edit
//                     </Button>
//                 </Modal.Body>
//             </Modal>
//         </>
//     );
// }
