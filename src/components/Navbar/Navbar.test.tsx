import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

function NavbarRouterWrapper(): React.ReactElement {
    return (
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
}

describe('Component::Navbar Tests', () => {
    it('renders the correct nav links', () => {
        const navLinks = [/reserve/i, /status/i, /admin/i];
        const { getByRole } = render(<NavbarRouterWrapper />);

        navLinks.forEach((navLink) => {
            expect(getByRole('link', { name: navLink })).toBeInTheDocument();
        });
    });

    it('renders the logo', () => {
        const { getByAltText } = render(<NavbarRouterWrapper />);

        expect(getByAltText(/logo/i));
    });
});
