import { Button, FileInput, Modal } from "flowbite-react";
import { useState } from "react";
import { storeFile } from "../../../services/fileService";
import { AiOutlineFileAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import { useTheme } from "../../../utils/theme_provider";

export function UploadFileModal({ handlStoreFile, groupId }) {
    const [openModal, setOpenModal] = useState(false);
    const [newFile, setNewFile] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const theme = useTheme().theme;

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
            toast.error('يرجى إدخال الملف المراد تحميله.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
            });
            setIsLoad(false)
            return
        }
        try {
            const result = await storeFile(groupId, newFile);
            console.log(result);

            handlStoreFile({ id: result.data.id, name: result.data.name, active_status: result.data.active_status });
            setNewFile(null);
            setIsLoad(false)
            setOpenModal(false)
        } catch (error) {
            toast.error(`${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: theme,
            });
            setIsLoad(false)
        }

    };

    return (
        <>
            <Button size="sm" color="blue" className="button" onClick={() => setOpenModal(true)}><AiOutlineFileAdd size={20} /> Upload File</Button>
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
