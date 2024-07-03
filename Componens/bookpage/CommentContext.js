// CommentContext.js
import React, { createContext, useContext, useState } from 'react';

const CommentUpdateContext = createContext({
  triggerFetch: () => {}
});

export const useCommentUpdate = () => useContext(CommentUpdateContext);

export const CommentProvider = ({ children }) => {
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const triggerFetch = () => {
    setUpdateTrigger(prev => !prev); // Toggle to trigger useEffect
  };

  return (
    <CommentUpdateContext.Provider value={{ triggerFetch }}>
      {children}
    </CommentUpdateContext.Provider>
  );
};