import { useEffect, useState } from "react";
import "../../../styles/Group/participants.css"

export default function Participants() {
  const imagePool = [
    "https://mario.nintendo.com/static/0f10f738d1f9aa8292fa7d93c35f2a07/fef79/mario.png",
    "https://mario.nintendo.com/static/e3ebf11b069067da929b608250baa44e/1ead7/toad.png",
    "https://mario.nintendo.com/static/7204f288e3e823a8203c445fb6cc0d7e/579b4/bowser.png",
    "https://mario.nintendo.com/static/850b7938ec9df2a77921738a12857e88/5dfac/yoshi.png",
    "https://mario.nintendo.com/static/7b0d4176a54cedac2466b9e5bf68548f/93c1a/bowser-jr.png",
    "https://mario.nintendo.com/static/07969e5525c53ae6c17bd8c2661c459d/3d2f6/boo.png",
    "https://mario.nintendo.com/static/cf6fdeef64062ae03ecc53b603a2c406/d31fb/diddy-kong.png",
  ];

  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("groupUserImages");

    if (saved) {
      setUserImages(JSON.parse(saved));
    } else {
      const shuffled = [...imagePool].sort(() => 0.5 - Math.random());
      const selected = [shuffled[0], shuffled[1]];
      localStorage.setItem("groupUserImages", JSON.stringify(selected));
      setUserImages(selected);
    }
  }, []);


  return (
    <section className="Participants">
      <div className="textUser">
        <h3>Miembros del grupo</h3>
      </div>
      <div className="groupUsers">
        <button className="inTheGroup">
          <img src={userImages[0]} alt="userPic1" />
          <p>Xrazer35</p>
        </button>
        <button className="inTheGroup">
          <img src={userImages[1]} alt="userPic2" />
          <p>Rupatropiña</p>
        </button>
      </div>
    </section>
  );
}