import PagesRoutes from './routes/routes'
import { BrowserRouter } from 'react-router-dom'
function App() {

  return (
    <>
      <BrowserRouter>
        <PagesRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
