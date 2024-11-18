import { Button, Checkbox, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { storeFile } from "../../../services/fileService";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { AiOutlineFileAdd } from "react-icons/ai";

export function UploadFileModal({ handlStoreFile, groupId }) {
    const [openModal, setOpenModal] = useState(false);
    const [newFile, setNewFile] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    const handleFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    const handleStoreFile = async (e) => {
        setIsLoad(true)
        e.preventDefault();
        if (!newFile) {
            Toastify({
                text: "يرجى إدخال الملف المراد تحميله.",
                duration: 5000,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
            }).showToast();
            setIsLoad(false)
            return
        }
        try {
            const result = await storeFile(groupId, newFile);
            console.log(result);

            handlStoreFile({ id: result.data.id, name: result.data.name, active: result.data.active });
            setNewFile(null);
            setIsLoad(false)
            setOpenModal(false)
        } catch (error) {
            console.error("Error uploading file:", error);
            Toastify({
                text: "Error uploading file: " + error.response.data.message,
                duration: 5000,
                close: true,
                gravity: "top",
                position: "center",
                style: {
                    backgroundColor: "gray",
                },
                stopOnFocus: true,
            }).showToast();
            setIsLoad(false)
        }

    };

    return (
        <>
            <Button size="sm" color="blue" className="button" onClick={() => setOpenModal(true)}><AiOutlineFileAdd size={20}/> Upload File</Button>
            <Modal show={openModal} size="md" dismissible popup onClose={onCloseModal} >
                <Modal.Header />
                <Modal.Body>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-5">Upload File</h3>

                    <FileInput onChange={handleFileChange} sizing="lg" />

                    <Button
                        className="mt-5"
                        isProcessing={isLoad}
                        disabled={!newFile}
                        onClick={handleStoreFile}
                    >Upload</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}
