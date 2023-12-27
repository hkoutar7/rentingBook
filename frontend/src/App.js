import SideBar from "./components/principal/SideBar";
import Navbar from "./components/principal/NavBar";
import { Route, Routes } from "react-router-dom";
import IndexBook from "./pages/book/IndexBook"
import CreateBook from "./pages/book/CreateBook";
import IndexAuthor from "./pages/author/IndexAuthor"
import ShowBook from "./pages/book/ShowBook";
import EditBook from "./pages/book/EditBook";

import "./assets/styles/default.css";
import "./assets/styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/app.css";

function App() {


    return (
        <div>
            <SideBar />
            <section className="home">
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element = { <p>dashboard</p> }></Route>
                        <Route path="/ourBooks" element = { <IndexBook /> }></Route>
                        <Route path="/ourBooks/AddBook" element = { <CreateBook /> }></Route>
                        <Route path="/ourBooks/:id" element = { <ShowBook /> }></Route>
                        <Route path="/ourBooks/EditBook/:id" element = { <EditBook /> }></Route>
                        <Route path="/ourAuthors" element = { <IndexAuthor /> }></Route>
                        <Route path="/userManagments" element = { <p>Users</p> }></Route>
                        <Route path="/*" element = { <p>Unfound</p> }></Route>
                    </Routes>
                </div>
                <div className="mb-5"></div>
            </section>
        </div>
    );
}

export default App