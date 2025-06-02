import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapButton from "./MapButton";
import MapButtonList from "./MapButtonList";
import { getClassroomDetails } from "../../../utils/classrooms/classroomsApi";
import { getBoardDetails } from "../../../utils/boards/boardsApi";
import {
  getComputersBatchDetails,
  getComputerDetails,
} from "../../../utils/computers/computersApi";
import { getBoardsBatchDetails } from "../../../utils/boards/boardsApi";
import { fetchComputersWithDetails } from "../../../utils/computers/computersApi";

import { fetchUsers } from "../../../utils/users/usersApi";
import SelectUserModal from "./SelectUserModal";
import SelectComputerModal from "./SelectComputerModal";
import DeleteComputerModal from "./DeleteComputerModal";

export default function SecondDAWMap({ isOpen, onClose, children }) {
  const classroomId = 1;
  const [classroomData, setClassroomData] = useState(null);
  const [totalComputers, setTotalComputers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [availableComputers, setAvailableComputers] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isComputerModalOpen, setIsComputerModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState(null);
  const [isLoadingBoard, setIsLoadingBoard] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

useEffect(() => {
  const loadData = async () => {
    try {
      const classroom = await getClassroomDetails(classroomId);
      setClassroomData(classroom);

      if (classroom?.boards?.length) {
        const boardIds = classroom.boards.map((b) => b.id);
        const boardDetails = await getBoardsBatchDetails(boardIds);

        const allComputers = boardDetails.flatMap((board) => board.computers || []);
        setTotalComputers(allComputers.length);

        const computerIds = allComputers.map((comp) => comp.id);
        const computerDetailsList = await getComputersBatchDetails(computerIds);

        const totalUsers = computerDetailsList.reduce(
          (sum, comp) => sum + (comp.user ? 1 : 0),
          0
        );
        setTotalUsers(totalUsers);
      } else {
        setTotalComputers(0);
        setTotalUsers(0);
      }

      await refreshData();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  if (isOpen) {
    loadData();
  }
}, [isOpen]);

  const handleUserUpdate = (updatedUser, computerId) => {
    setSelectedBoard((prevBoard) => {
      if (!prevBoard) return prevBoard;
      const updatedComputers = prevBoard.computers.map((comp) =>
        comp.id === computerId ? { ...comp, user: updatedUser } : comp
      );
      return { ...prevBoard, computers: updatedComputers };
    });
  };

  const handleUserClick = (user, computer) => {
    setCurrentUser(user);
    setSelectedComputer(computer);
    setIsUserModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleMapButtonClick = async (boardId) => {
    if (selectedBoard?.id === boardId) {
      setSelectedBoard(null);
    } else {
      try {
        setIsLoadingBoard(true);
        const boardDetails = await getBoardDetails(boardId);

        const detailedComputers = await Promise.all(
          (boardDetails.computers || []).map((comp) =>
            getComputerDetails(comp.id)
          )
        );

        const boardWithUsers = {
          ...boardDetails,
          computers: detailedComputers,
        };

        setSelectedBoard(boardWithUsers);
      } catch (error) {
        console.error("Error fetching board or computer details:", error);
      } finally {
        setIsLoadingBoard(false);
      }
    }
  };

  const refreshSelectedBoard = async () => {
    if (!selectedBoard) return;
    try {
      setIsLoadingBoard(true);
      const boardDetails = await getBoardDetails(selectedBoard.id);
      const detailedComputers = await Promise.all(
        (boardDetails.computers || []).map((comp) =>
          getComputerDetails(comp.id)
        )
      );

      setSelectedBoard({
        ...boardDetails,
        computers: detailedComputers,
      });
    } catch (error) {
      console.error("Error refreshing board details:", error);
    } finally {
      setIsLoadingBoard(false);
    }
  };

  const refreshData = async () => {
    try {
      const fetchedAvailable = await fetchComputersWithDetails();
      const fetchedUsers = await fetchUsers();
      const unassignedUsers = fetchedUsers.filter(
        (user) => user.computer_id === null
      );
      setAvailableComputers(fetchedAvailable);
      setUsers(unassignedUsers);
      console.log("Se ha hecho refreshData");
    } catch (error) {
      console.error("Error actualizando datos disponibles:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-3 right-8 z-50 text-7xl text-white hover:text-primary hover:cursor-pointer transition-all ease-in-out
              bg-opacity-80 hover:bg-opacity-100 rounded-full w-14 h-14 flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0, ease: "easeInOut" }}
          >
            ×
          </motion.button>

          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="rounded-lg overflow-hidden shadow-xl relative"
              style={{ width: "1390px", height: "780px" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="relative w-full h-full">
                <img
                  src={children.props.src}
                  alt={children.props.alt}
                  className="w-full h-full object-cover"
                />

                <div>
                  <MapButton
                    text="Mesa 1"
                    top="top-85"
                    left="left-55"
                    onClick={() => handleMapButtonClick(1)}
                  />
                  <MapButton
                    text="Mesa 2"
                    top="top-88"
                    left="left-108"
                    onClick={() => handleMapButtonClick(2)}
                  />
                  <MapButton
                    text="Mesa 3"
                    top="top-91"
                    left="left-163"
                    onClick={() => handleMapButtonClick(3)}
                  />
                  <MapButton
                    text="Mesa 4"
                    top="top-95"
                    left="left-228"
                    onClick={() => handleMapButtonClick(4)}
                  />
                </div>
                <div>
                  <MapButton
                    text="Mesa 5"
                    top="top-123"
                    left="left-25"
                    onClick={() => handleMapButtonClick(5)}
                  />
                  <MapButton
                    text="Mesa 6"
                    top="top-129"
                    left="left-74"
                    onClick={() => handleMapButtonClick(6)}
                  />
                  <MapButton
                    text="Mesa 7"
                    top="top-130"
                    left="left-131"
                    onClick={() => handleMapButtonClick(7)}
                  />
                  <MapButton
                    text="Mesa 8"
                    top="top-132"
                    left="left-197"
                    onClick={() => handleMapButtonClick(8)}
                  />
                </div>

                <div>
                  <MapButton
                    text="Mesa 9"
                    top="top-80"
                    right="right-25"
                    onClick={() => handleMapButtonClick(9)}
                  />
                </div>

                <MapButtonList
                  bottom="bottom-7"
                  right="right-7"
                  info={classroomData}
                  totalComputers={totalComputers}
                  totalUsers={totalUsers}
                  selectedBoard={selectedBoard}
                  onUserClick={handleUserClick}
                  isLoading={isLoadingBoard}
                  onComputerAdded={refreshSelectedBoard}
                  onAddComputerClick={() => setIsComputerModalOpen(true)}
                  onDeleteClick={handleDeleteClick}
                />

                {isUserModalOpen && (
                  <SelectUserModal
                    currentUser={currentUser}
                    availableUsers={users}
                    computer={selectedComputer}
                    onChangeUser={(newUser, computerId) => {
                      handleUserUpdate(newUser, computerId);
                      refreshData();
                    }}
                    onClose={() => setIsUserModalOpen(false)}
                  />
                )}

                {isComputerModalOpen && selectedBoard && (
                  <SelectComputerModal
                    availableComputers={availableComputers}
                    selectedBoard={selectedBoard}
                    onAddComputer={() => {
                      refreshSelectedBoard();
                      refreshData();
                      setIsComputerModalOpen(false);
                    }}
                    onClose={() => setIsComputerModalOpen(false)}
                  />
                )}

                {isDeleteModalOpen && selectedBoard && (
                  <DeleteComputerModal
                    assignedComputers={selectedBoard.computers}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDeleteComputer={() => {
                      refreshSelectedBoard();
                      refreshData();
                      setIsDeleteModalOpen(false);
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
