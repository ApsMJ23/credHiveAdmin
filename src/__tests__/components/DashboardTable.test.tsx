// DashboardTable.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardTable from '../../modules/Dashboard/Components/DashboardTable/DashboardTable';

// Mock for useSearchParams hook
vi.mock('react-router-dom', () => ({
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
}));

// Data for testing
const headers = [
    { name: 'Column 1', key: '1' },
    { name: 'Column 2', key: '2' },
];
const rows = [
    { 'Column 1': 'Data 1-1', 'Column 2': 'Data 1-2' },
    { 'Column 1': 'Data 2-1', 'Column 2': 'Data 2-2' },
];

// Mock functions for props
const setShowEditingModalMock = vi.fn();
const setShowViewModalMock = vi.fn();

describe('DashboardTable', () => {
    it('renders headers and rows correctly', async () => {
        render(
            <DashboardTable
                headers={headers}
                rows={rows}
                setShowEditingModal={setShowEditingModalMock}
                setShowViewModal={setShowViewModalMock}
            />
        );

        // Check headers
        headers.forEach((header) => {
            expect(screen.getByText(header.name)).toBeInTheDocument();
        });

        // Check rows
        rows.forEach((row) => {
            Object.entries(row).forEach(([key, value]) => {
                expect(screen.getByText(value)).toBeInTheDocument();
            });
        });
    });

    it('calls setShowViewModal on clicking the first cell of the first row', async () => {
        render(
            <DashboardTable
                headers={headers}
                rows={rows}
                setShowEditingModal={setShowEditingModalMock}
                setShowViewModal={setShowViewModalMock}
            />
        );

        const firstCell = screen.getByText(rows[0]['Column 1']);
        await userEvent.click(firstCell);

        expect(setShowViewModalMock).toHaveBeenCalledTimes(1);
        expect(setShowViewModalMock).toHaveBeenCalledWith(true);
    });

    it('calls setShowEditingModal and sets params on clicking edit icon', async () => {
        render(
            <DashboardTable
                headers={headers}
                rows={rows}
                setShowEditingModal={setShowEditingModalMock}
                setShowViewModal={setShowViewModalMock}
            />
        );

        const editIcon = screen.getAllByTestId('edit-icon'); // Add data-testid for icon
        await userEvent.click(editIcon[0]);
        waitFor(() => {
            expect(setShowEditingModalMock).toHaveBeenCalledTimes(1);
            expect(setShowEditingModalMock).toHaveBeenCalledWith(true);
            expect(window.location.search).toBe('?id=0'); // Mocked location
        })
    });

    it('toggles flagged state on clicking flag icon', async () => {
        render(
            <DashboardTable
                headers={headers}
                rows={rows}
                setShowEditingModal={setShowEditingModalMock}
                setShowViewModal={setShowViewModalMock}
            />
        );

        const firstFlagIcon = screen.getAllByTestId('flag-icon')[0];
        await userEvent.click(firstFlagIcon);

        expect(screen.getByRole('cell', { name: /Data 1-1/i })).toHaveStyle({
            backgroundColor: 'rgb(255, 230, 230)',
        });

        await userEvent.click(firstFlagIcon);

        expect(screen.getByRole('cell', { name: /Data 1-1/i })).not.toHaveStyle({
            backgroundColor: 'rgb(255, 230, 230)',
        });
    });
});
