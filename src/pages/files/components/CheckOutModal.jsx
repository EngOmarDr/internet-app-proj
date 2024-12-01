import { Button, FileInput, Modal } from "flowbite-react";
import { useState } from "react";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { checkOut } from "../../../services/fileService";

export function CheckOutModal({ groupId, fileId ,handleEditFile}) {
    const [openModal, setOpenModal] = useState(false);
    const [newFile, setNewFile] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    function onCloseModal() {
        setNewFile(null);
        setIsLoad(false)
        setOpenModal(false)
        setOpenModal(false);
    }

    const handleFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    const handleCheckOut = async (e) => {
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
            const file = await checkOut(groupId, fileId, newFile);
            

            handleEditFile(file);
            setNewFile(null);
            setIsLoad(false)
            setOpenModal(false)
        } catch (error) {
            console.error("Error uploading file:", error);
            Toastify({
                text: "Error uploading file: " + error.response,
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
            <Button size="sm" className="button" onClick={() => setOpenModal(true)}>Check Out</Button>
            <Modal show={openModal} size="md" dismissible popup onClose={onCloseModal} >
                <Modal.Header />
                <Modal.Body>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-5">Check Out File</h3>

                    <FileInput onChange={handleFileChange} sizing="lg" />

                    <Button
                        className="mt-5"
                        isProcessing={isLoad}
                        disabled={!newFile}
                        onClick={handleCheckOut}
                    >Upload</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}
