import {render,screen} from '@testing-library/react'
import App from './App'

test('render leran react link'),()=>{
    render(<App/>)
    const linkElement=screen.getByText(/learn react/i);
    expect((linkElement).toBeInDocument())

}
