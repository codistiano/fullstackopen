import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('calls createBlog with correct details when a new blog is created', async () => {
      // Mock the createBlog function
      const createBlog = vi.fn();
  
      // Render the BlogForm component
      render(<BlogForm createBlog={createBlog} />);
  
      // Open the form by clicking "New Note"
      const newNoteButton = screen.getByText('New Note');
      await userEvent.click(newNoteButton);
  
      // Fill in the form fields
      const titleInput = screen.getByLabelText(/title:/i);
      const authorInput = screen.getByLabelText(/author:/i);
      const urlInput = screen.getByLabelText(/url:/i);
      const createButton = screen.getByText('Create');
  
      await userEvent.type(titleInput, 'My New Blog');
      await userEvent.type(authorInput, 'John Doe');
      await userEvent.type(urlInput, 'http://example.com');
  
      // Submit the form
      await userEvent.click(createButton);
  
      // Assert that createBlog was called once with the correct data
      expect(createBlog).toHaveBeenCalledTimes(1);
      expect(createBlog).toHaveBeenCalledWith({
        title: 'My New Blog',
        author: 'John Doe',
        url: 'http://example.com',
      });
    });
  });