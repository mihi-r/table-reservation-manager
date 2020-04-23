import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AlertMessage from './AlertMessage';
import AppErrors from '../../exceptions/appErrors/appErrors';
import AppError from '../../exceptions/appError';
import { AppErrorInfo, ErrorType } from '../../types/general';

describe('Component::AlertMessage Tests', () => {
    it('renders the unknown error message for an undefined error', () => {
        const error = undefined;
        const { getByText } = render(<AlertMessage error={error} />);

        expect((getByText(AppErrors.unknownError().message))).toBeInTheDocument();
    });

    it('renders the unknown error code for an undefined error', () => {
        const error = undefined;
        const { getByText } = render(<AlertMessage error={error} />);

        const expectedCode = new RegExp(AppErrors.unknownError().code.toString());
        expect((getByText(expectedCode))).toBeInTheDocument();
    });

    it('renders an error when an undefined error is passed in', () => {
        const error = undefined;
        const { getByText } = render(<AlertMessage error={error} />);

        expect((getByText(/error/i, { selector: 'h2' }))).toBeInTheDocument();
    });

    it('renders an error when an AppError of type error is passed in', () => {
        const errorInfo: AppErrorInfo = {
            message: 'message',
            code: 5001,
            type: ErrorType.Error,
        };
        const error = new AppError(errorInfo);

        const { getByText } = render(<AlertMessage error={error} />);

        expect((getByText(/error/i, { selector: 'h2' }))).toBeInTheDocument();
    });

    it('renders a warning when an AppError of type warning is passed in', () => {
        const errorInfo: AppErrorInfo = {
            message: 'message',
            code: 5001,
            type: ErrorType.Warning,
        };
        const error = new AppError(errorInfo);

        const { getByText } = render(<AlertMessage error={error} />);

        expect((getByText(/warning/i, { selector: 'h2' }))).toBeInTheDocument();
    });

    it('removes the message when the close button is clicked for an AppError of type error', () => {
        const errorInfo: AppErrorInfo = {
            message: 'message',
            code: 5001,
            type: ErrorType.Error,
        };
        const error = new AppError(errorInfo);

        const { queryByText, getByLabelText } = render(<AlertMessage error={error} />);

        expect((queryByText(/error/i, { selector: 'h2' }))).toBeInTheDocument();

        fireEvent.click(getByLabelText('Close'));
        expect((queryByText(/error/i, { selector: 'h2' }))).toBeNull();
    });

    it('removes the message when the close button is clicked for an AppError of type warning', () => {
        const errorInfo: AppErrorInfo = {
            message: 'message',
            code: 5001,
            type: ErrorType.Warning,
        };
        const error = new AppError(errorInfo);

        const { queryByText, getByLabelText } = render(<AlertMessage error={error} />);

        expect((queryByText(/warning/i, { selector: 'h2' }))).toBeInTheDocument();

        fireEvent.click(getByLabelText('Close'));
        expect((queryByText(/warning/i, { selector: 'h2' }))).toBeNull();
    });
});
