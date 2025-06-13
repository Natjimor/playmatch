import "../../styles/ParticipantsSection.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecomendationButton() {
const navigate = useNavigate();
const navigateFormsGroup = () => {
    navigate('/groupform')
  }
  return (
    <button onClick={navigateFormsGroup} className="RecommendationButton">
        <img src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/GameController.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvR2FtZUNvbnRyb2xsZXIuc3ZnIiwiaWF0IjoxNzQ5ODAwMDU3LCJleHAiOjE3ODEzMzYwNTd9.zs39gSc8v6aKpOS4f2rShEK0ZMFoIHTCN5k1tJ750lA" alt="Mando" />
        <p>Recomendación</p>
    </button>
  );
}