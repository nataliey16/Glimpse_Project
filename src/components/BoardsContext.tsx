import React, { createContext, useContext, useState, ReactNode } from 'react';

type Board = {
    id: string;
    name: string;
    description: string;
    photos: Photo[] | null;
};

type Photo = {
    id: number;
    width: number;
    height: number;
    src: {
      small: string;
      original: string;
    };
};  

interface BoardsContextType {
    boards: Board[];
    addBoard: (boardId: string, photo: Photo) => void;
    addNewBoard: (board: Board) => void;
}

const BoardsContext = createContext<BoardsContextType | undefined>(undefined);

export const BoardsProvider = ({ children }: { children: ReactNode }) => {
    const [boards, setBoards] = useState<Board[]>([]);

    const addNewBoard = (board: Board) => {
        setBoards((prevBoards) => [...prevBoards, { ...board, photos: board.photos || [] },]);
    };

    const addBoard = (boardId: string, photo: Photo) => {
        setBoards((prevBoards) =>
        prevBoards.map((board) =>
            board.id === boardId
            ? { ...board, photos: board.photos ? [...board.photos, photo] : [photo], }
            : board
        )
        );
    };

    return (
        <BoardsContext.Provider value={{ boards, addBoard, addNewBoard }}>
        {children}
        </BoardsContext.Provider>
    );
};

export const useBoards = (): BoardsContextType => {
    const context = useContext(BoardsContext);
    if (!context) {
        throw new Error('useBoards must be used within a BoardsProvider');
    }
    return context;
};
