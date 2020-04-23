import React from 'react';
import { render } from '@testing-library/react';
import WarningMessage from './WarningMessage';

describe('Component::WarningMessage Tests', () => {
    it('renders the correct message', () => {
        const message = 'this is a sample message';
        const { getByText } = render(<WarningMessage message={message} code={0} />);

        expect(getByText(message)).toBeInTheDocument();
    });

    it('renders the correct code', () => {
        const code = 5000;
        const { getByText } = render(<WarningMessage message="" code={code} />);

        expect(getByText(new RegExp(code.toString()))).toBeInTheDocument();
    });
});
