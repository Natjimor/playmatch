import { useState } from 'react';
import RecommendationFormContext from './RecommendationFormContext';

function RecommendationFormProvider({ children }) {
  const [showForm, setShowForm] = useState(false);

  const value = {
    showForm,
    toggleForm: () => setShowForm(prev => !prev),
    openForm: () => setShowForm(true),
    closeForm: () => setShowForm(false)
  };

  return (
    <RecommendationFormContext.Provider value={value}>
      {children}
    </RecommendationFormContext.Provider>
  );
}

export default RecommendationFormProvider;
