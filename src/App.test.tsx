import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App Tests', () => {
    it('renders a navigation bar', () => {
        const { getByRole } = render(<App />);
        expect(getByRole('navigation')).toBeInTheDocument();
    });

    it('renders a page', () => {
        const { getByRole } = render(<App />);
        expect(getByRole('main')).toBeInTheDocument();
    });
});
