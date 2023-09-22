import logo from "./logo.svg";
import "./App.css";
import ShowBlogs from "./blog/ShowBlogs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateBlog from "./blog/CreateBlog";
import EditBlog from "./blog/EditBlog";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShowBlogs />} />
            <Route path="/insertar" element={<CreateBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
