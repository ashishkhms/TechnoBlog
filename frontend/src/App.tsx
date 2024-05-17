import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { FullBlog } from './pages/FullBlog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/blog/:id" element={< FullBlog/>} />
          <Route path="/blogs" element={<Blogs/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App