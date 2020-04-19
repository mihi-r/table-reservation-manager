import React from 'react';
import { render } from '@testing-library/react';
import * as fetchData from '../../services/apiService/apiService';
import ReservationOpener from './ReservationOpener';
import { Admins } from '../../types/apiResponseData';

jest.mock('../../services/apiService/apiService');
const mockedfetchData = (fetchData as jest.Mocked<typeof fetchData>).default;

describe('Component::ReservationOpener Tests', () => {
    it('renders a loading skeleton for width > 600 when the get all admins response is pending', () => {
        mockedfetchData.mockReturnValue(new Promise(() => null));
        const { getAllByRole } = render(<ReservationOpener />);

        getAllByRole('status').forEach((element) => {
            expect(element).toBeInTheDocument();
        });
    });

    it('renders a loading skeleton for width <= 600 when the get all admins response is pending', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 600 });

        mockedfetchData.mockReturnValue(new Promise(() => null));
        const { getAllByRole } = render(<ReservationOpener />);

        getAllByRole('status').forEach((element) => {
            expect(element).toBeInTheDocument();
        });
    });

    it('renders a correctly formatted paragraph when a single admin is returned', async () => {
        const admins: Admins = [
            {
                id: 1,
                name: 'Bob Ross',
                email: 'bob.ross@gmail.com',
            },
        ];
        mockedfetchData.mockResolvedValue(admins);

        const { findByText } = render(<ReservationOpener />);
        expect(await findByText(/email Bob Ross \(bob\.ross@gmail\.com\)/)).toBeInTheDocument();
    });

    it('renders a correctly formatted paragraph when 2 admins are returned', async () => {
        const admins: Admins = [
            {
                id: 1,
                name: 'Bob Ross',
                email: 'bob.ross@gmail.com',
            },
            {
                id: 2,
                name: 'Alan Turing',
                email: 'alan.turing@outlook.com',
            },
        ];
        mockedfetchData.mockResolvedValue(admins);

        const { findByText } = render(<ReservationOpener />);
        expect(await findByText(/email Bob Ross \(bob\.ross@gmail\.com\) or Alan Turing \(alan\.turing@outlook\.com\)/)).toBeInTheDocument();
    });

    it('renders a correctly formatted paragraph when more than 2 admins are returned', async () => {
        const admins: Admins = [
            {
                id: 1,
                name: 'Bob Ross',
                email: 'bob.ross@gmail.com',
            },
            {
                id: 2,
                name: 'Alan Turing',
                email: 'alan.turing@outlook.com',
            },
            {
                id: 3,
                name: 'Grace Hopper',
                email: 'grace.hopper@yahoo.com',
            },
        ];
        mockedfetchData.mockResolvedValue(admins);

        const { findByText } = render(<ReservationOpener />);
        const expectedText = new RegExp('email Bob Ross \\(bob\\.ross@gmail\\.com\\), Alan Turing \\(alan\\.turing@outlook\\.com\\), '
            + 'or Grace Hopper \\(grace\\.hopper@yahoo\\.com\\)');
        expect(await findByText(expectedText)).toBeInTheDocument();
    });
});
