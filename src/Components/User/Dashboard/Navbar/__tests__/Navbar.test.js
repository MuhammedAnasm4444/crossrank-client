import { render, screen, cleanup} from '@testing-library/react'
import Navbar from '../Navbar'
test('should render Navbar' , () => {
   render(<Navbar/>);
   const nav = screen.getByTestId('nav');
   expect(nav).toBeInTheDocument();
})