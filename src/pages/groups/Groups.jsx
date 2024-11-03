import React, { useEffect, useState } from 'react';
import './Groups.css';
import { FaUserPlus, FaFolderOpen, FaCog, FaPlusCircle, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { indexGroup, storeGroup, updateGroup } from '../../services/groupService';
import { Navigate, useNavigate } from 'react-router-dom';
import { GoPencil, GoTrash } from 'react-icons/go';

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showUpdateGroup, setShowUpdateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [messageError, setMessageError] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(-1);
  const [groups, setGroups] = useState([])
  const nav = useNavigate()

  const handleCreateGroup = async () => {
    try {
      let newGroup = await storeGroup(newGroupName)

      setGroups([...groups, {
        id: newGroup.id,
        name: newGroup.name
      }])

    } catch (error) {
      console.log(error);
      throw error.response ? error.response.data : new Error("Network Error");
    }
    setShowCreateGroup(false);
  };

  const handleUpdateGroup = async () => {
    try {
      console.log(selectedGroupId);

      let newGroup = await updateGroup(newGroupName, selectedGroupId)

      console.log(newGroup);

      setGroups((prevGroup) => {
        return prevGroup.map(item => {
          if (item.id === selectedGroupId) {
            return { ...item, name: newGroup.name }; // Create a new object with the updated name
          }
          return item; // Return the original item if no update is needed
        });
      })
      setMessageError(null)
    } catch (error) {
      console.log(error.message);
      setMessageError(error.message)
      throw error.response ? error.response.data : new Error("Network Error");
    }
    setShowCreateGroup(false);
    setNewGroupName("")
  };

  useEffect(() => {
    indexGroup().then((groups) => setGroups(groups))
  }, [])


  function handleShowFiles(groupId) {
    nav(`${groupId}/files`)
  }

  return (
    <div className="groups">
      <header className="groups-header">
        <h2>Groups</h2>
        <button className="add-group-button" onClick={() => setShowCreateGroup(true)}>
          <FaPlusCircle /> Create New Group
        </button>
      </header>

      <div className="groups-list">
        {
          groups.length == 0
            ? <>
              <p className='text-center'> you don't have group do you want to <span className='text-blue-600 cursor-pointer' onClick={() => setShowCreateGroup(true)}>add one</span> </p>

            </>
            : <></>
        }
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <h3 className='text-xl'>{group.name}</h3>
            {/* <p>Created by: {group.creator}</p>
            <p>Members: {group.membersCount}</p> */}
            <div className="group-actions flex items-center ">
              <button className="action-button" onClick={() => handleShowFiles(group.id)}>
                <FaFolderOpen /> View Files
              </button>
              {/* <button className="action-button manage">
                <FaCog /> Manage Group
              </button> */}
              <GoPencil
                color='green'
                cursor='pointer'
                onClick={() => {
                  setSelectedGroupId(group.id)
                  setNewGroupName(group.name)
                  setShowCreateGroup(true)
                  setShowUpdateGroup(true)
                }}
              />


            </div>
          </div>
        ))}
      </div>

      {showCreateGroup && (
        <div className="create-group-modal">
          <div className="modal-content">
            <FaTimes className="close-modal" onClick={() => setShowCreateGroup(false)} />
            <h3>{showUpdateGroup ? 'Update Group Name' : 'Create New Group'}</h3>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="input-field"
            />
            {messageError && <p className='size-2 text-red-500 inline'>{messageError}</p>}
            <br />
            <button className="action-button" onClick={showUpdateGroup ? handleUpdateGroup : handleCreateGroup}>
              {(showUpdateGroup)
                ? <GoPencil />
                : <FaUserPlus />
              }
              {(showUpdateGroup)
                ? 'Update'
                : 'Add'
              }
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;