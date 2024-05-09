// SearchBar.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../modules/Dashboard/Components/SearchBar/SearchBar';

vi.mock('../../../../data/FakeData.ts', () => ({
    FakeDataArray: [
        { companyName: 'Company A', informalName: '', recentEditor: '', updatedOn: '', previousChanges: 0 },
        { companyName: 'Company B', informalName: '', recentEditor: '', updatedOn: '', previousChanges: 0 },
        { companyName: 'Search Term Inc.', informalName: '', recentEditor: '', updatedOn: '', previousChanges: 0 },
    ],
}));
vi.mock('react-router-dom', () => ({
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
}));
// Mock setData function (optional)
vi.fn().mockImplementation((data) => data); // Replace with your actual implementation if needed

describe('SearchBar', () => {
    it('renders search bar and icon correctly', () => {
        render(<SearchBar setData={vi.fn()} />);

        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
        expect(screen.getByTestId('searchIcon')).toBeInTheDocument(); // Search for icon by alt text (case-insensitive)
    });

    it('updates search term on input change', () => {
        render(<SearchBar setData={vi.fn()} />);

        const searchInput = screen.getByPlaceholderText('Search...');
        userEvent.type(searchInput, 'search term');

        waitFor(() =>
            expect(searchInput).toHaveValue('search term')
    );
});

it('filters data on search term change (mocked)', () => {
    const mockSetData = vi.fn();
    render(<SearchBar setData={mockSetData} />);

    const searchInput = screen.getByPlaceholderText('Search...');
    userEvent.type(searchInput, 'term');

    waitFor(() => {
        expect(mockSetData).toHaveBeenCalledWith([
            { companyName: 'Search Term Inc.', informalName: '', recentEditor: '', updatedOn: '', previousChanges: 0 },
        ]);
    });
});

    // Consider adding a test for the useEffect logic with empty search term
});
