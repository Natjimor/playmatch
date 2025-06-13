import { useContext } from 'react';
import RecommendationFormContext from '../context/RecommendationFormContext';

function useRecommendationForm() {
  const context = useContext(RecommendationFormContext);
  if (!context) {
    throw new Error('useRecommendationForm debe usarse dentro de un RecommendationFormProvider');
  }
  return context;
}

export default useRecommendationForm;
