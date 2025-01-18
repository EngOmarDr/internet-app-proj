import { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaEye, FaRegFileExcel } from "react-icons/fa6";
import { downloadFile, checkIn, fileVersions, fileOperationPdf, fileOperationCsv } from "../../services/fileService";
import { useParams } from "react-router-dom";
import { Slide, toast } from 'react-toastify';
import { UploadFileModal } from "./components/UploadFileModal";
import { Button, Checkbox, Modal, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { AiOutlineDownload } from "react-icons/ai";
import { CheckOutModal } from "./components/CheckOutModal";
import getFiles from "./hooks/getFilesHook";
import { useTheme } from "../../utils/theme_provider";
import { useTranslation } from "react-i18next";
import { FaRegFilePdf } from "react-icons/fa6";
import OperationsList from "./components/OperationsList";

const Files = () => {
    let { groupId } = useParams();
    const theme = useTheme().theme
    const { files, currentPage, lastPage, setFiles } = getFiles(groupId)

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const [versions, setVersions] = useState([]);
    const { t } = useTranslation()
    const [showFile, setShowFile] = useState()

    const handleStoreFile = (data) => {
        setFiles((prev) => [...prev, data]);
    };

    const handleEditFile = (newFile) => {
        const updatedItems = files.map(file => {
            if (file.id === newFile.id) {
                return newFile;
            }
            return file;
        });
        setFiles(updatedItems)
    };

    const handleMultiSelect = (file) => {
        if (!file.version) {
            toast.error('you have to select version for file', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                // transition: Bounce,
            });
            return;
        }
        setSelectedFiles((prevSelected) => {
            return prevSelected.includes(file)
                ? prevSelected.filter((e) => e != file)
                : [...prevSelected, file]
        });
    };

    const handleMultiVersion = (fileId, version) => {
        setFiles((oldFiles) =>
            oldFiles.map((file) =>
                file.id === fileId ? { ...file, version } : file
            )
        );
    };

    const handleCheckIn = async (selectedFiles) => {
        const file = selectedFiles.find((e) => e.version)
        if (!file) {
            toast.info('you have to select version for the file', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: theme,
                transition: Slide,
            });
            return;
        }
        try {
            console.log(selectedFiles);

            await checkIn(groupId, selectedFiles);

            const editeFiles = files.map((file) => {
                console.log(file, 'file');
                const item = selectedFiles.find((it) => it.file_id == file.id)

                if (item) {
                    return { id: file.id, name: file.name, is_locked: item.is_locked };
                }
                return file;
            })
            console.log(editeFiles);

            setFiles(editeFiles)

        } catch (error) {
            console.log(error);

            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                // transition: Bounce,
            });
        }
    };

    const getVersions = async (fileId) => {
        const res = await fileVersions(groupId, fileId);
        setVersions(res.data)
    };

    const handleDownload = async (fileId, fileName, version, showFile = false) => {
        if (!version) {
            toast.error('you have to select version', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
            });
            return
        }
        try {
            const data = await downloadFile(groupId, fileId, fileName, version, showFile);
            setModalOpen(true)
            if (showFile) {
                setShowFile(data);
            }
        } catch (error) {
            console.error("Error downloading file:", error);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                // transition: Bounce,
            });
        }
    };

    // if (isLoading) return (
    //     <div className="grid place-items-center h-[calc(100svh-110px)] ">
    //         <LoadingSpinner />
    //     </div>
    // )

    // if (error) return (
    //     <div className="grid place-items-center h-[calc(100svh-110px)]">
    //         <h1>{error.message}</h1>
    //     </div>
    // )

    return (
        <div className="px-5">
            <div className="actions flex flex-row gap-1 py-5 justify-between items-center">
                <div className="flex flex-row gap-1">
                    <Button
                        size="sm"
                        color="success"
                        className={`transition duration-300 ${selectedFiles.length > 0 ? "opacity-100" : "opacity-0 "} `}
                        onClick={() => {
                            const res = selectedFiles.map((e) => {
                                const file = files.find((e2) => e2.id == e.id);

                                return { file_id: file.id, version: parseInt(file.version) }
                            })
                            handleCheckIn(res)
                        }}>
                        {t("checkIn")}
                    </Button>
                </div>
                <UploadFileModal groupId={groupId} handlStoreFile={handleStoreFile} />
            </div>

            {/* Start Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <Table hoverable >
                    <TableHead >
                        <TableHeadCell className="p-4 bg-slate-200 rounded-ss-lg rounded-tl-none">
                            <Checkbox
                                checked={selectedFiles.length == files.length}
                                onChange={(e) => {
                                    // if (selectedVersions.length != files.length) {
                                    //     // toast.error('you have to selected version for all files');
                                    //     return;
                                    // }
                                    if (e.target.checked) {
                                        setSelectedFiles(files);
                                    } else {
                                        setSelectedFiles([]);
                                    }
                                }} />
                        </TableHeadCell>
                        <TableHeadCell className="bg-slate-200">{t("name")}</TableHeadCell>
                        <TableHeadCell className="bg-slate-200">{t("version")}</TableHeadCell>
                        <TableHeadCell className="bg-slate-200">{t("status")}</TableHeadCell>
                        <TableHeadCell className="bg-slate-200">{t("actions")}</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {files.map((file) => (
                            <TableRow key={file.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="p-4">
                                    <Checkbox
                                        checked={selectedFiles.includes(file)}
                                        onChange={() => handleMultiSelect(file)}
                                    />
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {file.name}
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <select
                                        id="versions"
                                        // eslint-disable-next-line no-unused-vars
                                        onClick={(_) => getVersions(file.id)}
                                        onChange={(e) => { handleMultiVersion(file.id, e.target.value) }}
                                        value={file.version ?? 'def' /*selectedVersions?.find(e => e.fileId == file.id)?.version ?? 'def'*/}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value='def' disabled >{t("version")}</option>
                                        {

                                            (versions.length > 0 && versions[0].file_id == file.id) ?
                                                versions.map((e) => {
                                                    return <option onSelect={(e) => handleMultiVersion(file.id, e.target.value)} key={e.id} value={e.Version_number}>{e.Version_number}</option>
                                                })
                                                : file.version /*selectedVersions?.find(e => e.fileId == file.id)?.version*/ ? <option value={file.version}>{file.version}</option> : <></>
                                        }
                                    </select>

                                </TableCell>
                                <TableCell> {file.is_locked ? t("reserved") : t("not_reserved")}</TableCell>
                                <TableCell className="flex items-center gap-1 ">

                                    {file.is_locked && (
                                        <CheckOutModal groupId={groupId} fileId={file.id} handleEditFile={handleEditFile} />
                                    )}

                                    {!file.is_locked && (
                                        <Button size="sm" onClick={() => handleCheckIn([{ file_id: file.id, version: file.version }])}>{t("checkIn")}</Button>
                                    )}

                                    <Button size="sm" title="download file" onClick={() => handleDownload(file.id, file.name, file.version)}><AiOutlineDownload className="h-5 w-5" /></Button>
                                    <Button size="sm" title="download changed as pdf" onClick={() => fileOperationPdf(groupId, file.id, file.name)}><FaRegFilePdf className="h-5 w-5" /></Button>
                                    <Button size="sm" title="download changed as csv" onClick={() => fileOperationCsv(groupId, file.id, file.name)}><FaRegFileExcel className="h-5 w-5" /></Button>
                                    <Button size="sm" title="show file" onClick={() => handleDownload(file.id, file.name, file.version, true)}><FaEye className="h-5 w-5" /></Button>
                                    {/* <EditFileModal handlEditFile={handleEditFile} groupId={groupId} file={file} /> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* End Table */}

            {/* Start Pagination */}
            <nav aria-label="Pagination" className="flex justify-end py-5">
                <Button
                    outline
                    color="light"
                    size="xs"
                    className="rounded-e-none border-2 !bg-transparent"
                    disabled={currentPage == 1}
                    onClick={() => getFiles(currentPage - 1)}
                >
                    {/* <span className="sr-only">Previous</span> */}
                    <FaAngleLeft title="previos page" aria-hidden="true" className="h-5 w-5" />
                </Button>
                {Array.from({ length: lastPage }, (_, index) => (
                    (index + 1 > currentPage - 3 && index + 1 < currentPage + 3) ?
                        <button
                            key={index + 1}
                            className={`relative z-1 inline-flex items-center px-4 py-2 text-sm font-semibold 
                                        ${currentPage == index + 1
                                    ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '
                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                }'}`}
                            onClick={() => getFiles(index + 1)}
                        >
                            {index + 1}
                        </button>
                        : null
                ))}

                <Button
                    outline
                    color="light"
                    size="xs"
                    className="rounded-s-none border-2 !bg-transparent"
                    onClick={() => getFiles(currentPage + 1)}
                    disabled={currentPage == lastPage}
                >
                    {/* <span className="sr-only">Next</span> */}
                    <FaAngleRight title="next page" aria-hidden="true" className="h-5 w-5" />
                </Button>
            </nav>
            {/* End Pagination */}

            <Modal show={isModalOpen} onClose={() => setModalOpen(false)} dismissible>
                <Modal.Body className="p-2 bg-slate-50">
                    <iframe
                        src={showFile}
                        width="100%"
                        height='500px'
                        title="Viewer"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setModalOpen(false)} className="btn btn-primary">
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            <div>
                <h1>My Operations App</h1>
                <h1>Operations Viewer</h1>
                <OperationsList groupId={groupId} fileId={1} />
            </div>
        </div>
    );
};

export default Files;
