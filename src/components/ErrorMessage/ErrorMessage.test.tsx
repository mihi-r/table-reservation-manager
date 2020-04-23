import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('Component::ErrorMessage Tests', () => {
    it('renders the correct message', () => {
        const message = 'this is a sample message';
        const { getByText } = render(<ErrorMessage message={message} code={0} />);

        expect(getByText(message)).toBeInTheDocument();
    });

    it('renders the correct code', () => {
        const code = 5000;
        const { getByText } = render(<ErrorMessage message="" code={code} />);

        expect(getByText(new RegExp(code.toString()))).toBeInTheDocument();
    });
});
