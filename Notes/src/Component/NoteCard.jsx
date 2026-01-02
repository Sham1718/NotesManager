import React from 'react'
import { getUsername } from '../Helpers/auth';

const NoteCard = ({ note, showActions, onEdit, onDelete }) => {
  const loggedName = getUsername();
  const isOwner = loggedName === note.user.username;

  return (
    <div
      className="
        bg-white dark:bg-[#161B22]
        border border-gray-300 dark:border-[#2D333B]
        rounded-xl p-5 w-full 
        shadow-md hover:shadow-lg 
        transition duration-300 
        flex flex-col justify-between
        min-h-[220px]
      "
    >
      {/* Title */}
      <h1
        className="
          text-xl font-bold 
          text-gray-900 dark:text-[#E5E7EB] 
          mb-2
        "
      >
        {note.title}
      </h1>

      {/* Content */}
      <p
        className="
          text-gray-700 dark:text-[#9CA3AF] 
          text-sm leading-relaxed 
          mb-3 
          overflow-hidden 
          text-ellipsis 
          line-clamp-3
        "
      >
        {note.content}
      </p>

      {/* Posted by */}
      <h3
        className="
          text-gray-500 dark:text-[#6B7280]
          text-xs font-mono
        "
      >
        Posted by:
        <span className="text-gray-800 dark:text-[#E5E7EB] ml-1">
          {note.user.username}
        </span>
      </h3>

      {/* Actions */}
      {isOwner && showActions && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onEdit(note)}
            className="
              px-3 py-1 rounded-lg 
              bg-blue-600 hover:bg-blue-700 
              text-white text-sm
            "
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="
              px-3 py-1 rounded-lg 
              bg-red-600 hover:bg-red-700 
              text-white text-sm
            "
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(NoteCard);
