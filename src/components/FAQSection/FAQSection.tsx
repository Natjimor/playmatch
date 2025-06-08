import '../../styles/FAQSection.css'
import { useState } from 'react';
import { FaPlus, FaTimes} from 'react-icons/fa';

const faqs = [
  {
    question: '¿Es necesario iniciar sesión para usar PlayMatch?',
    answer: 'Sí, debes iniciar sesión para que tus preferencias se guarden, ya sea desde la web o desde el bot de Telegram.',
  },
  {
    question: '¿Dónde recibo las recomendaciones de juegos?',
    answer: 'Las recomendaciones se envían en la plataforma donde hayas iniciado sesión: ya sea desde la web o desde el bot de Telegram.',
  },
  {
    question: '¿Puedo usar PlayMatch sin iniciar sesión?',
    answer: 'No, para guardar preferencias y recibir recomendaciones personalizadas es necesario iniciar sesión en alguna de las dos plataformas.',
  },
  {
    question: '¿Qué plataformas están incluidas en las recomendaciones?',
    answer: 'PlayMatch incluye juegos para PC, Xbox, PlayStation y Nintendo Switch, con filtros según las plataformas que use tu grupo.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="FAQSection">
      <div className="FAQInfo">
        <h4>PQR</h4>
        <h2>Preguntas frecuentes sobre PlayMatch</h2>

        <div className="FAQList">
          {faqs.map((faq, index) => (
            <div key={index} className={`FAQItem ${openIndex === index ? 'open' : ''}`}>
              <button className="FAQButton" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                <span>{faq.question}</span>
                {openIndex === index ? <FaTimes /> : <FaPlus />}
              </button>
              {openIndex === index && <p className="FAQAnswer">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className='FAQSectImg'
        style={{
            backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Pizza.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvUGl6emEucG5nIiwiaWF0IjoxNzQ5MzczMDM5LCJleHAiOjE3ODA5MDkwMzl9.0hJ6146jQgOFkBdmRg6ZSk7FkXPsjtDkJ0IdpfD_Mlo")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </section>
  );
}