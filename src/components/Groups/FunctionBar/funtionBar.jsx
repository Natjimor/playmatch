import "../../../styles/Group/functionBar.css"

export default function FunctionBar() {

  return (
    <section className="functionBar">
        <div className="groupName">
            <h1># Los tilines</h1>
        </div>
        <div className="participantsBtns">
            <div className="textUsers">
            <h2>Integrantes</h2>
            </div>
            <div className="btnsUsers">
            <button className="addUser">
                <img src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/addUser.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvYWRkVXNlci5zdmciLCJpYXQiOjE3NDkyNzQyNTAsImV4cCI6MTc1MTg2NjI1MH0.R-puLMb4LOM4j4UF5EBjLITZXHG9AJao6D43BTcBGms" alt="addUser" />
            </button>
            <button className="deleteUser">
                <img src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/deleteUser.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvZGVsZXRlVXNlci5zdmciLCJpYXQiOjE3NDkyNzQyNjksImV4cCI6MTc1MTg2NjI2OX0.KPzKNrQrHZX_4_3g4s1aO55Ie4nRawuxmVYT5iJy_vY" alt="deleteUser" />
            </button>
            </div>
        </div>
    </section>
  )
}