import { ChakraProvider, Box } from '@chakra-ui/react'
import { TodoList } from './components/TodoList'

function App() {
  return (
    <ChakraProvider>
      <Box 
        minH="100vh" 
        bg="orange.50"
        backgroundImage="url('https://www.transparenttextures.com/patterns/cat-pattern.png')"
      >
        <TodoList />
      </Box>
    </ChakraProvider>
  )
}

export default App
