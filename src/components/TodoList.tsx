import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Input,
  Button,
  Text,
  Checkbox,
  useToast,
  Container,
  Heading,
  Flex,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { todoService, Todo } from '../services/couchdb';
import { FaCat, FaTrash, FaPlus } from 'react-icons/fa';

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const toast = useToast();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const loadedTodos = await todoService.getAllTodos();
    setTodos(loadedTodos.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo = await todoService.addTodo(newTodo.trim());
      setTodos([todo, ...todos]);
      setNewTodo('');
      toast({
        title: 'NOM NOM NOM!',
        description: 'New task addedz!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'OH NOES!',
        description: 'Can haz error?',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await todoService.updateTodo({
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map(t => t._id === updatedTodo._id ? updatedTodo : t));
    } catch (error) {
      toast({
        title: 'OH NOES!',
        description: 'Can haz error?',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTodo = async (todo: Todo) => {
    try {
      await todoService.deleteTodo(todo);
      setTodos(todos.filter(t => t._id !== todo._id));
      toast({
        title: 'BYE BYE!',
        description: 'Task iz gonez!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'OH NOES!',
        description: 'Can haz error?',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box 
        bg="white" 
        p={6} 
        borderRadius="lg" 
        boxShadow="xl"
        border="4px"
        borderColor="orange.200"
      >
        <Stack spacing={8}>
          <Heading 
            textAlign="center" 
            mb={4} 
            color="orange.500"
            fontSize="4xl"
            fontFamily="Comic Sans MS, cursive"
          >
            <HStack justify="center" spacing={4}>
              <Icon as={FaCat} />
              <Text>MAI TODO LISTZ</Text>
              <Icon as={FaCat} />
            </HStack>
          </Heading>
          
          <form onSubmit={handleAddTodo}>
            <Flex gap={4}>
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Wut needz to be donez?"
                size="lg"
                bg="orange.50"
                borderColor="orange.200"
                _hover={{ borderColor: 'orange.300' }}
                _focus={{ borderColor: 'orange.400' }}
              />
              <Button
                type="submit"
                colorScheme="orange"
                size="lg"
                leftIcon={<FaPlus />}
              >
                Addz!
              </Button>
            </Flex>
          </form>

          <Stack spacing={4}>
            {todos.map((todo) => (
              <Flex
                key={todo._id}
                p={4}
                bg="orange.50"
                borderRadius="md"
                align="center"
                justify="space-between"
                border="2px"
                borderColor="orange.200"
                _hover={{ borderColor: 'orange.300' }}
              >
                <HStack spacing={4}>
                  <Checkbox
                    isChecked={todo.completed}
                    onChange={() => handleToggleTodo(todo)}
                    colorScheme="orange"
                    size="lg"
                  />
                  <Text
                    fontSize="lg"
                    textDecoration={todo.completed ? 'line-through' : 'none'}
                    color={todo.completed ? 'gray.500' : 'gray.700'}
                  >
                    {todo.text}
                  </Text>
                </HStack>
                <Button
                  colorScheme="red"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTodo(todo)}
                  leftIcon={<FaTrash />}
                >
                  Deletez
                </Button>
              </Flex>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}; 